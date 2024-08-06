import { Img } from "react-image";
import LogoImage from "../assets/react.svg";
import { FC } from "react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { logoStylesTypes, logoTypes } from "../lib/types";
import { appConfigs } from "../lib/data";

export const Logo: FC<logoTypes> = ({ className, style = "bold" }) => {
  const _styles: Record<logoStylesTypes, string> = {
    normal: "bona-nova-sc-regular",
    bold: "bona-nova-sc-bold",
    italic: "bona-nova-sc-regular-italic",
  };

  return (
    <Link
      to={"/"}
      className={cn(_styles[style], "flex items-center gap-2 font-bold")}
    >
      <Img src={LogoImage} alt="Logo" className={cn(className, "")} />
      {appConfigs["name"]}
    </Link>
  );
};
