import { createRoom } from "./server";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const Page = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <WichtelCard />
      <InfoCard />
    </div>
  );
};

const InfoCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wichteln Online!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Auf dieser Seite kannst du einen Raum erstellen, um mit deinen
          Freunden zu wichteln.
        </p>
        <p>Klicke einfach auf den Button links und du kannst starten.</p>
      </CardContent>
    </Card>
  );
};

const WichtelCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wichtelraum erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Klicke hier um einen Raum zu erstellen.</p>
        <p>Du wirst danach zu deinem Raum weitergeleitet.</p>
        <form className="mt-8" action={createRoom}>
          <Label htmlFor="name">Dein Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Markus"
            required
            className="w-56"
          />
          <Button className="mt-2" type="submit">
            Raum erstellen
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Page;
