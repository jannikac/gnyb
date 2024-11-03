"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  joinSchema,
  type JoinSchema,
  type CreateSchema,
  createSchema,
} from "./schemas";
import { createRoom, joinRoom } from "./server";
import { useToast } from "~/components/ui/use-toast";

export const CreateRoomForm = () => {
  const form = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (v) => {
          await createRoom(v);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dein Name</FormLabel>
              <FormControl>
                <Input placeholder="Markus" className="w-56" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button pending={form.formState.isSubmitting} type="submit">
          Raum erstellen
        </Button>
      </form>
    </Form>
  );
};

export const JoinRoomForm = ({ roomId }: { roomId: string }) => {
  const { toast } = useToast();
  const form = useForm<JoinSchema>({
    resolver: zodResolver(joinSchema),
    defaultValues: { name: "", roomId },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (v) => {
          try {
            await joinRoom(v);
          } catch (e) {
            if (e instanceof Error) {
              toast({
                title: "Fehler",
                description: e.message,
                variant: "error",
              });
            }
          }
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dein Name</FormLabel>
              <FormControl>
                <Input placeholder="Markus" className="w-56" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button pending={form.formState.isSubmitting} type="submit">
          Raum beitreten
        </Button>
      </form>
    </Form>
  );
};
