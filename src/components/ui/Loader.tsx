import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

const Loader = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        className,
        "h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent",
      )}
      {...props}
    />
  );
};

export default Loader;
