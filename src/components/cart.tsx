import { ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { FC } from "react";
import { cn } from "../lib/utils";

export const Cart: FC<{ className?: string }> = ({ className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            className,
            "rounded-full shadow-md cursor-pointer z-30"
          )}
        >
          <ShoppingCartIcon size={17} />
        </Button>
      </SheetTrigger>
      <SheetContent>CART</SheetContent>
    </Sheet>
  );
  //
};
