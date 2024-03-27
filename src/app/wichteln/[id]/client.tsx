"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LinkDisplayCopy from "~/components/ui/LinkDisplayCopy";
import { Alert } from "~/components/ui/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

export const JoinModal = ({
  showJoinModal,
  roomId,
}: {
  showJoinModal: boolean;
  roomId: string;
}) => {
  const [opened, setOpened] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    setOpened(showJoinModal);
  }, [showJoinModal]);

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Du bist erfolgreich dem Raum beigetreten.
          </AlertDialogTitle>
          <AlertDialogDescription>
            Speichere deinen Link!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Alert variant="destructive">
          <p>
            Speichere dir den Link ab, damit du wenn das Spiel gestartet ist
            deinen Wichtelpartner sehen kannst.
          </p>
          <LinkDisplayCopy
            relativeLink={`/wichteln/${roomId}?secret=${searchParams.get(
              "secret",
            )}`}
          />
        </Alert>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              const newSearch = new URLSearchParams(searchParams);
              newSearch.delete("showJoinModal");
              router.replace(`/wichteln/${roomId}?${newSearch.toString()}`);
              setOpened(false);
            }}
          >
            Erledigt
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
