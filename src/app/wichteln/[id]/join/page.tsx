import { joinRoom } from "../../server";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const Page = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <JoinCard roomId={params.id} />
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
          Auf dieser Seite kannst du dem aktuellen Raum beitreten, um mit deinen
          Freunden zu wichteln.
        </p>
      </CardContent>
    </Card>
  );
};

const JoinCard = ({ roomId }: { roomId: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wichtelraum beitreten</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Du wurdest zu einem Wichtelraum eingeladen.</p>
        <p>
          Gebe unten deinen Namen ein und klicke auf &apos;Raum beitreten&apos;.
        </p>
        <form className="mt-8" action={joinRoom}>
          <Label htmlFor="name">Dein Name</Label>
          <Input
            id="name"
            required
            name="name"
            placeholder="Markus"
            className="w-56"
          />
          <input name="roomId" readOnly hidden={true} value={roomId} />
          <Button className="mt-2" type="submit">
            Raum beitreten
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Page;
