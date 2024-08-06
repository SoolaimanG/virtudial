import { FC } from "react";
import { cn } from "../lib/utils";

export const FixedNavBar: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ children, className, ...props }) => {
  return (
    <nav {...props} className={cn(className, "w-full fixed z-50")}>
      {children}
    </nav>
  );
};
