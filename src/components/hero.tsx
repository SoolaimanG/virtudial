import { RocketIcon, ZapIcon } from "lucide-react";
import { Dots } from "./dots";
import { GlobeDemo } from "./globe-demo";
import { MaxScreenSize } from "./max-screen-size";
import { Text } from "./text";
import { Button } from "./ui/button";
import { BackgroundBeams } from "./background-beam";
import { Badge } from "./ui/badge";
import { appConfigs, miniFeatures } from "../lib/data";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="pt-16 h-screen flex md:flex-row flex-col w-full relative items-center overflow-hidden">
      <div className="absolute top-4 right-4">
        <Dots widthLength={7} heightLength={8} />
      </div>

      <MaxScreenSize className="p-2 flex flex-col gap-2 z-20">
        <Badge
          variant="secondary"
          className="w-fit flex items-center gap-1 rounded-sm"
        >
          Revolutionize Your Communication
          <ZapIcon size={17} />
        </Badge>
        <h1 className="text-5xl leading-[3.8rem]">
          Make the switch and stay{" "}
          <span className=" bg-blue-500 text-white rounded-2xl px-3 border border-blue-500">
            connected
          </span>{" "}
          at all times.
        </h1>
        <Text>
          With {appConfigs["name"]}, seamlessly connect with customers around
          the world using our powerful virtual number services. Whether you're a
          small business looking to expand or a large corporation managing
          international clients, our instant activation, global coverage, and
          complete privacy protection ensure your business communications are
          always reliable and secure. Experience the future of communication
          with {appConfigs["name"]}.
        </Text>
        <div className="flex items-center gap-2">
          <Button variant="primary" asChild>
            <Link
              className="flex items-center gap-2"
              to={appConfigs.paths.explore.default}
            >
              Explore Numbers <RocketIcon />
            </Link>
          </Button>
          <Button variant="outline" className="gap-2">
            Sign up with email
          </Button>
        </div>
        <div className="flex items-center gap-1 flex-wrap mt-2">
          {miniFeatures.map((feature, index) => (
            <div key={feature} className=" flex items-center gap-1">
              <Button size="sm" variant="ghost">
                {feature}
              </Button>
              {miniFeatures.length - 1 !== index && (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </div>
          ))}
        </div>
      </MaxScreenSize>
      <GlobeDemo />
      <div className="absolute bottom-3 left-4 -z-10">
        <Dots widthLength={7} heightLength={8} />
      </div>
      <BackgroundBeams />
    </div>
  );
};
