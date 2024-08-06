import { FC, Fragment, useEffect, useState } from "react";
import { DiscountBanner } from "../components/discount-banner";
import { MaxScreenSize } from "../components/max-screen-size";
import { Button } from "../components/ui/button";
import { BentoGrid } from "../components/ui/bento-grid";
import { cn, getEuropeCountries } from "../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { appConfigs } from "../lib/data";
import { PercentIcon } from "lucide-react";
import { Img } from "react-image";
import USAFlag from "../assets/american-flag.png";
import { MarqueeDemo } from "../components/marquee-ui";
import { ShiningButton } from "../components/ui/shining-button";
import { useQuery } from "@tanstack/react-query";
import { marqueeCard } from "../lib/types";

const SpecialOffers: FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn(className, "p-2")}>
      <CardContent className="p-0 relative flex flex-col gap-2">
        <PercentIcon size={90} className="opacity-35 absolute right-3 top-2" />
        <Img
          src={USAFlag}
          alt="usa-special-offer"
          className="w-[10rem] h-[5rem] rounded-sm"
        />
        <h1 className="text-2xl bona-nova-sc-bold">
          USA SPECIAL NUMBER OFFERS
        </h1>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor vero
          nostrum sequi nesciunt, iure illum atque fuga, quo libero nihil beatae
          consectetur laboriosam reprehenderit deleniti alias ipsam ipsa dicta
          culpa aperiam soluta sed tempore ducimus!
        </CardDescription>
        <Button asChild variant="primary" className="rounded-sm w-fit mt-5">
          <Link to={appConfigs.paths.explore["usa-special-offers"]}>
            See offers
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const FreeVerificationNumber: FC<{ className?: string }> = ({ className }) => {
  const effect = (invert: boolean = false) => {
    return (
      <div
        className={cn(
          "w-full border border-gray-400 dark:bg-slate-900 rounded-3xl p-1 flex flex-row gap-2 items-center",
          invert && "flex-row-reverse"
        )}
      >
        <div className="w-[8%]">
          <div className="w-[1.5rem] h-[1.5rem] div-gradient rounded-full" />
        </div>
        <div className="w-[92%] dark:bg-slate-800 bg-gray-200 h-[1rem] rounded-2xl animate-pulse" />
      </div>
    );
  };

  return (
    <Card className={cn(className, "p-2")}>
      <CardContent className="p-0">
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, idx) => (
            <Fragment key={idx}>{effect(idx === 1)}</Fragment>
          ))}
        </div>
        <h1 className="text-2xl bona-nova-sc-bold mt-2">
          Free Verification Number
        </h1>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex ea id
          adipisci totam!
        </CardDescription>
        <Button variant="primary" className="w-fit rounded-sm mt-3">
          <Link to={appConfigs.paths.explore["free-verification-numbers"]}>
            Use Number
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const AvailableCountries: FC<{ className?: string }> = ({ className }) => {
  const [countries, setCountries] = useState<{
    firstRow: marqueeCard[];
    secondRow: marqueeCard[];
  }>({ firstRow: [], secondRow: [] });

  const { data } = useQuery({
    queryKey: ["available-countries"],
    queryFn: () => getEuropeCountries(),
  });

  useEffect(() => {
    if (!data?.length) return;

    const _firstRowCountries = data.slice(0, data.length / 2);
    const _secondRowCountries = data.slice(data.length / 2);

    setCountries({
      ...countries,
      firstRow: _firstRowCountries.map((_) => ({
        img: _.flags?.png,
        username: _.name.common,
        name: _.name.official,
      })),
      secondRow: _secondRowCountries.map((_) => ({
        img: _.flags.png,
        username: _.name.common,
        name: _.name.official,
      })),
    });
  }, [data]);

  return (
    <Card className={cn(className, "p-2")}>
      <CardContent className="flex flex-col gap-3 p-0">
        <h1 className="text-center text-3xl bona-nova-sc-bold">
          Join Millions on the path to fluency
        </h1>
        <CardDescription className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          dolores corporis labore? Obcaecati quam quis dolorum maiores
          exercitationem nemo aut magni assumenda. Nesciunt beatae consectetur
          unde impedit voluptates facilis porro quae odit, suscipit qui
          provident tenetur dicta perspiciatis ab nisi!
        </CardDescription>
        <MarqueeDemo
          options={{ pauseOnHover: true }}
          _firstRow={countries.firstRow}
          _secondRow={countries.secondRow}
        />
        <CardFooter className="p-0 w-full flex items-center justify-center">
          <ShiningButton>
            <Link to={appConfigs.paths.explore["available-countries"]}>
              See available countries
            </Link>
          </ShiningButton>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
//

const ExplorePage = () => {
  const items = [SpecialOffers, FreeVerificationNumber, AvailableCountries];

  return (
    <MaxScreenSize>
      <section className="flex flex-col gap-3 pb-14">
        <DiscountBanner
          button={
            <Button className="w-fit" variant="primary">
              Purchase number
            </Button>
          }
        />
        {/*  */}
        <BentoGrid className="gap-3 ">
          {items.map((Item, idx) => (
            <Item
              key={idx}
              className={cn(
                idx === 0 && "md:col-span-2",
                idx === 2 && "md:col-span-3"
              )}
            />
          ))}
        </BentoGrid>
      </section>
    </MaxScreenSize>
  );
};

export default ExplorePage;
