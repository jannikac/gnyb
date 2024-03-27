"use client";

import { IconClipboard } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

const LinkDisplayCopy = ({ relativeLink }: { relativeLink?: string }) => {
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    if (relativeLink === undefined) setPathname(window.location.href);
    else
      setPathname(
        `${window.location.protocol}//${window.location.host}${relativeLink}`,
      );
  }, [relativeLink]);

  return (
    <div className="align my-2 flex flex-row items-center justify-between rounded-md border-[1px] border-secondary bg-card p-2">
      <div className="break-all">{pathname}</div>
      <Button
        variant="ghost"
        className="px-2 "
        title="In Zwischenablage kopieren"
        onClick={() => navigator.clipboard.writeText(pathname)}
      >
        <IconClipboard />
      </Button>
    </div>
  );
};

export default LinkDisplayCopy;
