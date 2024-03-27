import {
  type FilteredUserWithPartner,
  type RoomWithUsers,
  getRoom,
  getUser,
} from "../server";
import Link from "next/link";
import UserList from "./UserList";
import { JoinModal } from "./client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    secret: string | undefined;
    showJoinModal: string | undefined;
  };
}) => {
  const room = await getRoom(params.id);
  const user = await getUser(searchParams.secret);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Raum {room.id}</CardTitle>
          <CardDescription>Wichtelraum</CardDescription>
        </CardHeader>
        <CardContent>
          <JoinModal
            roomId={room.id}
            showJoinModal={searchParams.showJoinModal !== undefined}
          />
          <RoomBody room={room} user={user} />
        </CardContent>
        <CardFooter>
          <ActionBar room={room} user={user} />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Liste der Benutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList room={room} currentUser={user} users={room.users} />
        </CardContent>
      </Card>
    </div>
  );
};

const RoomBody = ({
  user,
  room,
}: {
  user: FilteredUserWithPartner | undefined;
  room: RoomWithUsers;
}) => {
  if (user === undefined)
    return (
      <div>
        <p>Hallo anonymer Nutzer!</p>
        {room.started ? (
          <p>
            Das Spiel ist bereits gestartet, du kannst leider nicht beitreten.
          </p>
        ) : (
          <p>
            Klicke unten auf Raum beitreten, um diesem Wichtelraum beizutreten.
          </p>
        )}
      </div>
    );
  return (
    <div>
      <p>Hallo {user.name}!</p>
      {room.started ? (
        <p>
          Dein Wichtelpartner ist: <b>{user.partner?.name}</b>
        </p>
      ) : (
        <p>
          Das Spiel wurde noch nicht gestartet. Warte bis alle Leute dem Raum
          beigetreten sind und der Admin das Spiel gestartet hat. Dann wird dir
          auf dieser Seite dein Wichtelpartner angezeigt.
        </p>
      )}
    </div>
  );
};

const ActionBar = ({
  user,
  room,
}: {
  user: FilteredUserWithPartner | undefined;
  room: RoomWithUsers;
}) => {
  if (user?.admin)
    return (
      <div>
        <Button asChild>
          <Link href={`/wichteln/${room.id}/admin?secret=${user.secret}`}>
            Zum Adminbereich
          </Link>
        </Button>
      </div>
    );
  if (user === undefined && !room.started)
    return (
      <div>
        <Button asChild>
          <Link href={`/wichteln/${room.id}/join`}>Raum beitreten</Link>
        </Button>
      </div>
    );
  return <div />;
};

export default Page;
