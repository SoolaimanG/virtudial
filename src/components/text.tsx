import { FC } from "react";
import { cn } from "../lib/utils";

export const Text: FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
> = ({ className, children, ...props }) => {
  return (
    <p {...props} className={cn(className, "1text-sm text-muted-foreground")}>
      {children}
    </p>
  );
};
