import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { JoinRoomForm } from "../../client";

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
        <p className="mb-8">
          Gebe unten deinen Namen ein und klicke auf &apos;Raum beitreten&apos;.
        </p>
        <JoinRoomForm roomId={roomId} />
      </CardContent>
    </Card>
  );
};

export default Page;
