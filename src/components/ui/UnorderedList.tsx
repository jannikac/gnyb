import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";

const UnorderedList = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"ul">) => {
  return (
    <ul className={cn(className, "list-inside list-disc")} {...props}>
      {children}
    </ul>
  );
};

const UnorderedListItem = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"li">) => {
  return (
    <li className={cn(className, "ml-4")} {...props}>
      {children}
    </li>
  );
};
UnorderedList.Item = UnorderedListItem;

export default UnorderedList;
