import type { ComponentProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "~/lib/utils";

export const CustomCard = ({ children, ...props }: ComponentProps<"div">) => {
  return <Card {...props}>{children}</Card>;
};

const CustomCardButtons = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn(className, "mb-4 flex justify-around")} {...props}>
      {children}
    </div>
  );
};

CustomCard.Buttons = CustomCardButtons;

const CustomCardTitle = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <CardHeader className={cn(className, "flex items-center")} {...props}>
      <CardTitle>{children}</CardTitle>
    </CardHeader>
  );
};

CustomCard.Title = CustomCardTitle;

const CustomCardContent = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <CardContent className={cn(className)} {...props}>
      {children}
    </CardContent>
  );
};

CustomCard.Content = CustomCardContent;
