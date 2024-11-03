"use client";
import type { Room, User } from "@prisma/client";
import { type FilteredUser, kickFromRoom } from "../server";
import { IconKey, IconTrash } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import LinkDisplayCopy from "~/components/ui/LinkDisplayCopy";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useToast } from "~/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserIdSchema, userIdSchema } from "../schemas";
import { useState } from "react";

const UserList = <T extends FilteredUser[] | User[]>({
  users,
  currentUser,
  admin = false,
  room,
}: {
  users: T;
  currentUser: User | undefined;
  admin?: boolean;
  room: Room;
}) => {
  const sortFn = () => {
    // sort list of users so it stays consistent.
    // also put the current user at the top of the list.
    const sorted = [...users].sort();
    if (currentUser === undefined) return sorted;
    const index = sorted.findIndex((user) => user.id === currentUser.id);
    const temp = sorted[0];
    if (temp === undefined) return sorted;
    sorted[0] = currentUser;
    sorted[index] = temp;
    return sorted;
  };
  const localUsers = sortFn();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>..</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.name} {user.id === currentUser?.id && " (Das bist du)"}
            </TableCell>
            <TableCell>
              {admin && !(user.id === currentUser?.id) && (
                <div className="flex gap-2">
                  <KickButton user={user} room={room} />
                  <ShowSecretButton user={user} room={room} />
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const ShowSecretButton = <T extends User | FilteredUser>({
  user,
  room,
}: {
  user: T;
  room: Room;
}) => {
  if (!("secret" in user)) return <></>;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-2"
          title="Link für diesen Benutzer anzeigen"
        >
          <IconKey className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link für {user.name} anzeigen</DialogTitle>
          <DialogDescription>
            Unten kannst du den privaten Link eines Benutzers einsehen. Nutzte
            dies beispielsweise, wenn eine Nutzer seinen Link vergessen hat.
          </DialogDescription>
        </DialogHeader>
        <LinkDisplayCopy
          relativeLink={`/wichteln/${room.id}?secret=${user.secret}`}
        />
      </DialogContent>
    </Dialog>
  );
};

const KickButton = <T extends User | FilteredUser>({
  user,
  room,
}: {
  user: T;
  room: Room;
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<UserIdSchema>({
    resolver: zodResolver(userIdSchema),
    defaultValues: { userId: user.id },
  });
  const { toast } = useToast();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="px-2"
          disabled={room.started}
          pending={form.formState.isSubmitting}
          title="Löschen"
        >
          <IconTrash className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Benutzer entfernen</AlertDialogTitle>
          <AlertDialogDescription>
            Möchtest du {user.name} aus dem Raum entfernen?
            <br />
            Wenn dieser Benutzer den Link noch besitzt, kann dieser erneut
            beitreten.
          </AlertDialogDescription>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (v) => {
                  try {
                    await kickFromRoom(v);
                    setOpen(false);
                    toast({
                      title: "Benutzer entfernt",
                      variant: "success",
                      description: `Du hast ${user.name} erfolgreich aus dem Raum entfernt.`,
                    });
                  } catch (e) {
                    if (e instanceof Error) {
                      toast({
                        title: "Fehler",
                        variant: "error",
                        description: e.message,
                      });
                    }
                  }
                })}
              >
                <Button pending={form.formState.isSubmitting} type="submit">
                  Bestätigen
                </Button>
              </form>
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserList;
