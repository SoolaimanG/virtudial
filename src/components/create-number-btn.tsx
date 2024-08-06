import { FC, ReactNode } from "react";
import { cn } from "../lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export const CreateNumberBtn: FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>Create Number</DialogContent>
    </Dialog>
  );
};
