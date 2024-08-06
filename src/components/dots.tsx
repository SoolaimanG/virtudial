import { FC } from "react";
import { DotsTypes } from "../lib/types";
import { cn } from "../lib/utils";

export const Dots: FC<DotsTypes> = ({
  widthLength = 7,
  heightLength = 8,
  widthSpacing = "gap-4",
  heightSpacing = "gap-4",
  className,
}) => {
  return (
    <div className={cn("flex flex-col", heightSpacing)}>
      {Array.from({ length: heightLength }, (_, rowIndex) => (
        <div key={rowIndex} className={cn("flex gap-2", widthSpacing)}>
          {Array.from({ length: widthLength }, (_, colIndex) => (
            <div
              key={colIndex}
              className={cn(
                className,
                "h-1 w-1 rounded-full bg-white opacity-50"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
