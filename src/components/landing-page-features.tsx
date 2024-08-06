import { LayoutDashboardIcon } from "lucide-react";
import { MaxScreenSize } from "./max-screen-size";
import { Text } from "./text";
import { Badge } from "./ui/badge";
import { BentoGrid } from "./ui/bento-grid";
import { virtuDialFeatures } from "../lib/data";
import { FC, ReactElement } from "react";
import { cn } from "../lib/utils";

const Features: FC<{
  className?: string;
  icon: ReactElement;
  title: string;
  description: string;
}> = ({ className, icon, title, description }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent flex flex-col space-y-4",
        className
      )}
    >
      <h1 className="text-4xl">{title}</h1>
      <Text>{description}</Text>
      {icon}
    </div>
  );
};

export const LandingPageFeatures = () => {
  return (
    <MaxScreenSize className="p-2 flex items-center flex-col gap-2">
      <Badge variant="outline" className="rounded-sm">
        <Text className="flex items-center gap-2 text-blue-500">
          <LayoutDashboardIcon />
          Features
        </Text>
      </Badge>
      <h1 className="text-3xl text-center">
        Powerful Features To Elevate Your Needs
      </h1>
      <Text className="text-center">
        Unlock the full potential of your business with VirtuDial's powerful and
        versatile virtual number features
      </Text>
      <BentoGrid className="mt-3">
        {virtuDialFeatures.map((feature, i) => (
          <Features
            key={i}
            className="relative overflow-hidden"
            title={feature.title}
            description={feature.description}
            icon={
              <feature.icon
                className="opacity-35 absolute bottom-0 right-0 -mr-10 -mb-10 hover:text-blue-500 transition-all ease-in-out delay-75 cursor-pointer"
                size={250}
              />
            }
          />
        ))}
      </BentoGrid>
    </MaxScreenSize>
  );
};
//
