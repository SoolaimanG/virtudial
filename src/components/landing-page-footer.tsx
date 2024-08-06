import { Link } from "react-router-dom";
import { appConfigs, navLinks } from "../lib/data";
import { Logo } from "./logo";
import { MaxScreenSize } from "./max-screen-size";
import { Text } from "./text";
import { TextGenerateEffect } from "./generate-words";

export const LandingPageFooter = () => {
  const year = new Date().getFullYear();
  return (
    <MaxScreenSize className="md:mt-5">
      <footer className="w-full flex flex-col md:flex-row gap-5 md:gap-0 md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <Text>Copyright &copy; {year} VirtuDial INC.</Text>
          <Text>All rights reserved</Text>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <Link key={idx} to={link.path} className="hover:text-blue-950">
                <p>{link.slot}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Link to={"/"} className="hover:text-blue-950">
              <p>Privacy Policy</p>
            </Link>
            <Link to={"/"} className="hover:text-blue-950">
              <p>Refund policy</p>
            </Link>
          </div>
        </div>
      </footer>
      <TextGenerateEffect
        words={appConfigs["name"]}
        className="text-center"
        extraClassName="md:text-[15rem] text-[7rem] text-gradient"
      />
    </MaxScreenSize>
  );
};
