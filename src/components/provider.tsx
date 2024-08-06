import { FC, ReactNode } from "react";
import { AppNavigation } from "./app-navigation";
import { FixedNavBar } from "./fixed-nav-bar";
import { MaxScreenSize } from "./max-screen-size";
import { Logo } from "./logo";
import { Link } from "react-router-dom";
import { cn, isCurrentPage } from "../lib/utils";
import { SlashIcon } from "lucide-react";
import { DarkModeToggle } from "./dark-mode-toggle";
import { appConfigs } from "../lib/data";
import { Cart } from "./cart";

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const explorePagesNavigation = [
    {
      slot: "Find",
      path: appConfigs.paths.explore.find,
    },
    {
      slot: "Rent Number",
      path: appConfigs.paths.explore["rent-number"],
    },
  ];

  return (
    <div>
      <FixedNavBar className="p-2">
        <MaxScreenSize className="flex items-center w-full justify-between">
          <div className="flex z-30 items-center gap-3 w-fit rounded-3xl dark:bg-slate-900 bg-white shadow-lg dark:shadow-none py-2 px-5">
            <Logo />
            {explorePagesNavigation.map((page, idx) => (
              <div key={idx} className="hidden items-center gap-2 md:flex">
                <Link
                  to={page.path}
                  className={cn(
                    isCurrentPage(page.path, { pageLevel: 3, level: 3 }) &&
                      "text-white",
                    "text-gray-400"
                  )}
                >
                  {page.slot}
                </Link>
                {idx === 0 && <SlashIcon size={10} className="-rotate-45" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 z-30">
            <Cart />
            <DarkModeToggle />
          </div>
        </MaxScreenSize>
      </FixedNavBar>
      <main className="pt-16"> {children}</main>
      <AppNavigation />
    </div>
  );
};
