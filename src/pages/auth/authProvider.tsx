import { FC, useState } from "react";
import { authProviderPages, AuthProviderProps } from "../../lib/types";
import { SignUp } from "./signUp";
import { MaxScreenSize } from "../../components/max-screen-size";
import { Logo } from "../../components/logo";
import { BoxesBackground } from "../../components/box-background";
import { cn } from "../../lib/utils";
import { World } from "../../components/ui/globe";
import { globeConfig, sampleArcs } from "../../lib/data";
import { Text } from "../../components/text";
import { MarqueeDemo } from "../../components/marquee-ui";
import { Login } from "./login";
import { RequestAccountVerification } from "./request-account-verification";
import { VerifyAccount } from "./verify-account";
import { ForgetPassword } from "./Forget-password";
import { ResetPassword } from "./reset-password";

const GlobeDisplay = () => {
  return (
    <div className="w-full h-[40rem] flex items-end justify-center">
      <div className="absolute flex items-center justify-center w-full h-full">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </div>
  );
};

const Testimonies = () => {
  return (
    <div className="w-full px-4 ">
      <h1 className="bona-nova-sc-bold text-4xl">
        What our users says about us.
      </h1>
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
        eveniet omnis, quibusdam porro, veritatis totam sint possimus soluta
        molestias voluptatem laboriosam consequatur quo exercitationem aliquam
        dolorum debitis eaque esse autem.
      </Text>
      <MarqueeDemo />
    </div>
  );
};

const AuthProvider: FC<AuthProviderProps> = ({ pages }) => {
  const [active, setActive] = useState(1);

  const displays = [<GlobeDisplay />, <Testimonies />];

  const paginator = (
    <div className="glassmorphism py-1 px-2 rounded-2xl gap-2 flex">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          onClick={() => setActive(i)}
          className={cn(
            active === i ? "bg-blue-500" : "bg-gray-100",
            "w-2 h-2 rounded-full cursor-pointer"
          )}
        />
      ))}
    </div>
  );

  const views: Record<authProviderPages, any> = {
    login: Login,
    signup: SignUp,
    "forget-password": ForgetPassword,
    "verify-account": VerifyAccount,
    "request-account-verification": RequestAccountVerification,
    "reset-password": ResetPassword,
  };

  const Current = views[pages];

  return (
    <div className="w-full flex md:flex-row md:gap-3 md:p-2 h-screen overflow-hidden">
      <div className="md:w-[40%] w-full overflow-scroll">
        <MaxScreenSize>
          <Logo />
          <Current className="py-10" isPage={true} />
        </MaxScreenSize>
      </div>
      <div className="md:w-[60%] hidden md:flex h-full">
        <div className="relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

          <BoxesBackground />
          {displays[active]}
          {/* Paginator is here */}
          <div className="absolute bottom-2 w-full flex items-center justify-center">
            {paginator}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthProvider;
