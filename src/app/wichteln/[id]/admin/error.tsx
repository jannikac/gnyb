"use client";

import { useEffect } from "react";
import { Button } from "~/components/ui/button";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Ein Fehler ist aufgetreten</h2>
      <p>{error.message}</p>
      <span>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Zurück
        </Button>
      </span>
    </div>
  );
};

export default Error;
