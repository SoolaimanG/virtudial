import { CornerLeftDown, DollarSignIcon } from "lucide-react";
import { MaxScreenSize } from "./max-screen-size";
import { Badge } from "./ui/badge";
import { Text } from "./text";
import { BentoGrid } from "./ui/bento-grid";
import { appConfigs, virtuDialPricing } from "../lib/data";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

export const LandingPagePricing = () => {
  return (
    <MaxScreenSize className="p-2 md:p-0 flex flex-col items-center justify-center gap-3 md:mt-3 mt-0">
      <Badge variant="outline" className="rounded-sm w-fit">
        <DollarSignIcon />
        Pricing
      </Badge>
      <h1 className="text-3xl text-center">Select your pricing preference</h1>
      <Text className="text-center">
        At {appConfigs["name"]}, we offer flexible pricing plans to cater to the
        diverse needs of businesses of all sizes
      </Text>
      <BentoGrid className="md:auto-rows-[28.5rem] auto-rows-[27rem] gap-y-2">
        {virtuDialPricing.map((pricing, index) => (
          <div
            key={index}
            className={cn(
              "w-full cursor-pointer",
              pricing.planType === "Premium" && "p-1 bg-blue-500 rounded-xl",
              pricing.planType === "Diamond" && "mt-10 md:mt-0"
            )}
          >
            {pricing.planType === "Premium" && (
              <div className="flex items-center justify-center gap-1 p-2">
                <CornerLeftDown /> Best deals
              </div>
            )}
            <div className="row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent gap-2 flex flex-col">
              <div className="w-full flex items-center justify-between">
                <div
                  className={cn(
                    pricing.planType === "Premium"
                      ? "bg-blue-500"
                      : "glassmorphism",
                    "p-2 rounded-full w-fit"
                  )}
                >
                  <pricing.icon />
                </div>
                {pricing.haveDiscount && (
                  <Badge variant="primary">Save 20%</Badge>
                )}
              </div>
              <h1 className={cn("text-xl font-semibold")}>
                {pricing.planType}
              </h1>
              <Text>{pricing.description}</Text>
              <div className="flex gap-1 items-end mt-2">
                <h1 className="text-5xl">${pricing.amount}</h1>
                <Text>| month</Text>
              </div>
              <h1 className="text-2xl text-blue-500 font-semibold">
                {pricing.availability} month(s)
              </h1>
              <Button variant="primary" className="mt-6 rounded-3xl">
                Select
              </Button>
            </div>
          </div>
        ))}
      </BentoGrid>
    </MaxScreenSize>
  );
};
