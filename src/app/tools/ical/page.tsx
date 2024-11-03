"use client";
import ICAL from "ical.js";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const schema = z.object({
  file:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine(
            (file) => file.length === 1,
            "You can only select exactly 1 file",
          ),
  offsetHours: z.coerce.number().int().max(24).min(-24),
  offsetDays: z.coerce.number().int(),
});
type schemaT = z.infer<typeof schema>;

const Page = () => {
  const convert = async (formData: schemaT) => {
    const file = (formData.file as FileList)[0]!;
    const data = await file.text();
    const jCalData = ICAL.parse(data) as object[] | object;
    if (!Array.isArray(jCalData)) return;
    const comp = new ICAL.Component(jCalData);
    const events = comp.getAllSubcomponents("vevent");
    for (const event of events) {
      const offset = ICAL.Duration.fromData({
        hours: formData.offsetHours,
        days: formData.offsetDays,
      });
      event.addSubcomponent(new ICAL.Component("valarm"));
      const valarmSubcomponent = event.getFirstSubcomponent("valarm");
      if (valarmSubcomponent === null) return;
      valarmSubcomponent.addProperty(
        ICAL.Property.fromString("ACTION:DISPLAY"),
      );
      valarmSubcomponent.addProperty(
        ICAL.Property.fromString(
          `TRIGGER;RELATED=START:${offset.toICALString()}`,
        ),
      );
    }
    const result = ICAL.stringify(jCalData);
    const resultFile = new File([result], file.name, {
      type: "text/calendar",
    });
    const url = window.URL.createObjectURL(resultFile);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };
  const form = useForm<schemaT>({
    // resolver: async (data, context, options) => {
    //   console.log("formData", data);
    //   console.log(
    //     "validation result",
    //     await zodResolver(schema)(data, context, options),
    //   );
    //   return zodResolver(schema)(data, context, options);
    // },
    resolver: zodResolver(schema),
    defaultValues: { offsetDays: 0, offsetHours: 0 },
  });

  const fileRef = form.register("file");
  const offsetDaysRef = form.register("offsetDays", { valueAsNumber: true });
  const offsetHoursRef = form.register("offsetHours", { valueAsNumber: true });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ical Konverter</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Dieses Tool fügt zu jedem Kalenderereignis in der hochgeladenen
            Datei eine Erinnerung hinzu.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (v) => {
                await convert(v);
              })}
            >
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>Kalenderdatei hier hochladen</FormLabel>
                    <FormControl>
                      <Input
                        accept=".ics,.ifb,.iCal,.iFBf"
                        type="file"
                        {...fileRef}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offsetDays"
                render={() => (
                  <FormItem>
                    <FormLabel>Versatz der Tage</FormLabel>
                    <FormControl>
                      <Input type="number" {...offsetDaysRef} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offsetHours"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Versatz zum Start des Termins in Stunden (-24 bis 24
                      Stunden)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...offsetHoursRef} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Konvertieren</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
