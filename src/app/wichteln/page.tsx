import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CreateRoomForm } from "./client";

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
        <p className="mb-8">Du wirst danach zu deinem Raum weitergeleitet.</p>
        <CreateRoomForm />
      </CardContent>
    </Card>
  );
};

export default Page;
