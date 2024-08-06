import { FixedNavBar } from "./fixed-nav-bar";
import { Logo } from "./logo";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../src/components/ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { appConfigs, navLinks } from "../lib/data";
import { Link } from "react-router-dom";
import { MaxScreenSize } from "./max-screen-size";
import { Text } from "./text";

export const LandingPageNavbar = () => {
  const { width } = useWindowSize();
  const desktop = (
    <nav className="flex items-center justify-between py-2">
      <Logo />
      <div className="flex items-center gap-1">
        {navLinks.map((nav, i) => (
          <Button key={i} size="sm" variant="ghost">
            {nav.slot}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="primary">
          <Link to={appConfigs.paths["auth"]["signUp"]}>SignUp</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={appConfigs.paths["auth"]["signIn"]}>SignIn</Link>
        </Button>
      </div>
    </nav>
  );

  const mobile = (
    <nav className="w-full flex items-center justify-between">
      <Logo />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex items-center h-full justify-center flex-col gap-10">
          {[
            ...navLinks,
            { path: appConfigs.paths["auth"]["signIn"], slot: "SignIn" },
            { path: appConfigs.paths["auth"]["signUp"], slot: "SignUp" },
          ].map((nav, i) => (
            <Link key={i} to={nav.path}>
              <Text className="text-3xl hover:underline">{nav.slot}</Text>
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </nav>
  );

  return (
    <FixedNavBar className="glassmorphism p-1">
      <MaxScreenSize>{Number(width) > 767 ? desktop : mobile}</MaxScreenSize>
    </FixedNavBar>
  );
};
