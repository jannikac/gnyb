import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";

const Link = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) => {
  return (
    <a
      className={cn(
        "text-secondary-foreground underline decoration-secondary-foreground/40 decoration-2 hover:decoration-secondary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
