import { RecycleIcon } from "lucide-react";
import { MaxScreenSize } from "./max-screen-size";
import { Badge } from "./ui/badge";
import { Text } from "./text";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { appConfigs, virtuDialHowItWorks } from "../lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Img } from "react-image";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { DiscountBanner } from "./discount-banner";

export const LandingPageHowItWorks = () => {
  return (
    <MaxScreenSize className="flex items-center justify-center flex-col gap-2 md:mt-3">
      <Badge variant="outline" className="rounded-sm flex items-center gap-2">
        <RecycleIcon />
        How it works
      </Badge>
      <h1 className="text-3xl text-center">Step-by-Step Process</h1>
      <Text className="text-center">
        Getting started with {appConfigs["name"]} is simple and straightforward.
        Follow these easy steps to revolutionize your business communication
      </Text>
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <CarouselContent>
          {virtuDialHowItWorks.map((_, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <div className="p-1">
                <Card className="p-0 w-full">
                  <CardContent className="w-full flex flex-col items-start justify-start gap-3 p-2 h-[20rem]">
                    <Img src={_.image} className="w-[7rem] h-auto" />
                    <CardTitle className="flex items-start justify-start text-blue-500 w-full">
                      {index + 1}. {_.title}
                    </CardTitle>
                    <CardDescription>{_.description}</CardDescription>
                    <CardFooter className="p-0 h-full flex items-end justify-end">
                      <Button
                        variant="primary"
                        asChild
                        className="mt-4 rounded-none"
                      >
                        <Link to={_.buttonLink}>{_.buttonLabel}</Link>
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <DiscountBanner
        button={
          <Button
            asChild
            variant="primary"
            className="w-fit h-[3rem] rounded-3xl"
          >
            <Link to={appConfigs.paths["auth"]["signUp"]}>Register Now</Link>
          </Button>
        }
      />
    </MaxScreenSize>
  );
};
