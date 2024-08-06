import { FC } from "react";
import { Logo } from "./logo";
import { cn } from "../lib/utils";

export const PageLoader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "w-screen h-screen flex items-center justify-center flex-col gap-1"
      )}
    >
      <Logo />
      <div className="loader w-[20rem] h-1" />
    </div>
  );
};
