"use client";

import { useTransition } from "react";
import { startGame } from "../../server";
import { Button } from "~/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import LinkDisplayCopy from "~/components/ui/LinkDisplayCopy";
import { type Room } from "@prisma/client";
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

export const InviteButton = ({ roomId }: { roomId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2">Mitspieler einladen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mitspieler einladen</DialogTitle>
        </DialogHeader>
        <p>
          Du kannst deine Mitspieler einladen, imdem du Ihnen den Link, der
          unten steht zusendest.
        </p>
        <LinkDisplayCopy relativeLink={`/wichteln/${roomId}/join`} />
      </DialogContent>
    </Dialog>
  );
};

export const StartButton = ({ room }: { room: Room }) => {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={room.started} pending={pending}>
          Spiel starten
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Spiel starten</AlertDialogTitle>
          <AlertDialogDescription>
            Möchtest du das Spiel wirklich starten?
            <br />
            Danach können keine Spieler mehr beitreten und jeder Mitspieler
            erhält seinen Wichtelpartner.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Abbrechen</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              startTransition(async () => {
                await startGame(room.id);
                toast({
                  title: "Spiel gestartet",
                  variant: "success",
                  description:
                    "Du hast das Spiel erfolgreich gestartet. Gehe zurück zum Raum, um deinen Wichtelpartner zu sehen.",
                });
              });
            }}
          >
            Bestätigen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
