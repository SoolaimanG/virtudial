import { FC, ReactElement } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";

export const DiscountBanner: FC<{ button: ReactElement }> = ({ button }) => {
  return (
    <Card className="p-0 rounded-xl w-full">
      <div className="w-full flex items-center justify-between md:px-6 px-0">
        <CardContent className="py-8 w-full flex flex-col gap-2">
          <p className="text-sm underline">Promotion</p>
          <CardTitle className="text-3xl">
            Get a <span className="text-blue-500">discount</span> on your first
            purchase
          </CardTitle>
          <CardDescription>
            Take advantage of a great introductory rate on your first purchase.
            Register now to get started
          </CardDescription>
          <Button
            variant="link"
            asChild
            className="gap-2 px-1 items-start justify-start w-fit"
          >
            <Link to={"/"}>
              <CircleAlert size={17} />
              Terms and condition
            </Link>
          </Button>
          {button}
        </CardContent>
        <CardTitle className="text-9xl text-blue-500 opacity-50 md:block hidden">
          20%
        </CardTitle>
      </div>
    </Card>
  );
};
