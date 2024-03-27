import type { User } from "@prisma/client";
import Link from "next/link";
import { type RoomWithUsers, getUser, getRoomAdmin } from "../../server";
import UserList from "../UserList";
import { InviteButton, StartButton } from "./client";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { IconInfoCircle } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import LinkDisplayCopy from "~/components/ui/LinkDisplayCopy";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    secret: string | undefined;
    inviteDialog: string | undefined;
  };
}) => {
  const data = await getRoomAdmin(params.id, searchParams.secret ?? "");
  const user = await getUser(searchParams.secret);
  if (user?.admin === true) {
    if (user.admin) return <AdminPage user={user} room={data} />;
  }
  return <p>Error</p>;
};

const AdminPage = ({ room, user }: { room: RoomWithUsers; user: User }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Raum {room.id}</CardTitle>
          <CardDescription>
            Raum administrieren -{" "}
            {room.started ? (
              <span className="text-green-500">Spiel gestartet</span>
            ) : (
              <span className="text-yellow-500">
                Spiel noch nicht gestartet
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hallo {user.name} du befindest dich im Admin Bereich</p>
          <p>
            Hier kannst du Personen aus der Gruppe entfernen oder das Spiel
            starten.
          </p>
          <Alert className="mt-4" variant="destructive">
            <IconInfoCircle className="h-4 w-4" />
            <AlertTitle>Speichere deinen Adminlink!</AlertTitle>
            <AlertDescription>
              Speichere dir diesen Link bspw. als Lesezeichen und teile ihn
              <b> nicht</b> mit anderen Personen.
              <LinkDisplayCopy />
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button asChild>
            <Link href={`/wichteln/${room.id}?secret=${user.secret}`}>
              Zurück zum Raum
            </Link>
          </Button>
          <StartButton room={room} />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Liste der Benutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList room={room} admin users={room.users} currentUser={user} />
        </CardContent>
        <CardFooter>
          <InviteButton roomId={room.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
