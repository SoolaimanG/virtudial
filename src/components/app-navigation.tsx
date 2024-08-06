import { FC } from "react";
import { cn, isCurrentPage } from "../lib/utils";
import { appNavigation } from "../lib/data";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Link } from "react-router-dom";

export const AppNavigation: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "w-full fixed bottom-3 flex items-center justify-center"
      )}
    >
      <div className="w-fit dark:bg-slate-900 bg-white rounded-3xl shadow-lg dark:shadow-none flex items-center md:gap-3 gap-2 p-1 z-[99]">
        {appNavigation.map((app, idx) => (
          <TooltipProvider key={idx}>
            <Tooltip delayDuration={400}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full"
                  variant={isCurrentPage(app.path) ? "primary" : "secondary"}
                  asChild
                >
                  <Link to={app.path}>
                    <app.icon size={17} />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{app.slot}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
