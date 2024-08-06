import { FC, Fragment, useState } from "react";
import { Button } from "./ui/button";
import { GoogleIcon } from "./googleIcon";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "./ui/use-toast";
import { app, errorMessageAndStatus, VirtuDialAPI } from "../lib/utils";
import { useNavigate } from "react-router-dom";
import { appConfigs, completeProfileSchema } from "../lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { useWindowSize } from "@uidotdev/usehooks";
import { apiResponseStatus, IUser } from "../lib/types";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage, Form } from "./ui/form";
import { Input } from "./ui/input";
import { Text } from "./text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import { Checkbox } from "./ui/checkbox";
import { providerStore } from "../lib/store";

const CompleteAccountSignUp: FC<{ _open: boolean; _user?: IUser }> = ({
  _open = false,
  _user,
}) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const api = new VirtuDialAPI();
  const [_props, setProps] = useState({ open: _open, isPending: false });
  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      email: _user?.email,
      phoneNumber: _user?.phoneNumber,
    },
  });

  const _completeAccountSetUp = async (
    values: z.infer<typeof completeProfileSchema>
  ) => {
    try {
      setProps({ ..._props, isPending: true });
      const user = await api.completeAccountSetup(
        values.email,
        values.phoneNumber,
        values.joinNewsLetter
      );

      setProps({ ..._props, open: false });
      if (!user.data.isAccountVerified)
        return navigate(
          appConfigs.paths.auth.requestAccountVerification +
            `?email=${user.data.email}&phoneNumber=${user.data.phoneNumber}`
        );

      navigate("");
    } catch (error) {
      const _error = errorMessageAndStatus(error);
      toast({
        title: `Something went wrong: ${_error.status}`,
        description: _error.message,
        variant: "destructive",
      });
    } finally {
      setProps({ ..._props, isPending: false });
    }
  };

  const props = {
    title: "Complete your account setup",
    description:
      "Welcome! You're almost there. To fully activate your account and enjoy all the features, please complete the remaining steps in the setup process. This will ensure you have access to all the services and benefits we offer. Thank you for joining us!",
    form: (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(_completeAccountSetUp)}
          action=""
          className="flex flex-col gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Text>Email</Text>
                <FormControl>
                  <Input
                    className="h-[3rem]"
                    {...field}
                    disabled
                    placeholder="example@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <Text>Phone Number</Text>
                <FormControl>
                  <PhoneInput
                    {...field}
                    inputClass="h-[3rem]"
                    placeholder="2349038493830"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joinNewsLetter"
            render={({ field }) => (
              <FormItem className="flex flex-row-reverse gap-2 w-full justify-end items-start">
                <Text>Agree to our advertising emails?</Text>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={_props.isPending}
            variant="primary"
            className="w-full h-[3rem]"
            type="submit"
          >
            Complete Profile
          </Button>
        </form>
      </Form>
    ),
  };

  const renderr =
    Number(width) > 767 ? (
      <Dialog open={_props.open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl bona-nova-sc-bold">
              {props.title}
            </DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          {props.form}
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={_props.open}>
        <DrawerContent className="p-2">
          <DrawerHeader>
            <DrawerTitle className="text-2xl bona-nova-sc-bold">
              {props.title}
            </DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          {props.form}
        </DrawerContent>
      </Drawer>
    );
  return renderr;
};

export const ContinueWithGoogle: FC<{
  _isPending?: boolean;
  _callBack?: string;
}> = ({ _isPending = false }) => {
  const api = new VirtuDialAPI();
  const { setStatus } = providerStore();
  const [isPending, startTransition] = useState(_isPending);
  const [props, setProps] = useState<{
    open: boolean;
    user: null | IUser;
  }>({
    open: false,
    user: null,
  });
  const navigate = useNavigate();

  const _continueWithGoogle = async () => {
    try {
      startTransition(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          await __continueWithGoogle(credential?.accessToken || "");
          //
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast({
            title: `Something went wrong: ${errorCode}`,
            description: errorMessage,
            variant: "destructive",
          });
        });
    } catch (error) {
      console.log(error);
      const _error = errorMessageAndStatus(error);
      toast({
        title: `Something went wrong: ${_error.status}`,
        description: _error.message,
        variant: "destructive",
      });
    } finally {
      startTransition(false);
    }
  };

  const __continueWithGoogle = async (accessToken: string) => {
    const user = await api.continueWithGoogle(accessToken);

    setStatus(user.status as apiResponseStatus);
    // If this is the first time user logs update the user profile.
    if (user.data.phoneNumber === "+23400000000")
      // @ts-ignore
      return setProps({ open: true, user: user.data });
    if (!user.data.isAccountVerified)
      return navigate(appConfigs.paths.auth.requestAccountVerification);
  };

  return (
    <Fragment>
      <CompleteAccountSignUp
        _open={props.open}
        _user={props.user as IUser}
        key={String(props.open)}
      />
      <Button
        disabled={isPending}
        variant="outline"
        onClick={_continueWithGoogle}
        className="w-full h-[3rem] gap-2"
      >
        <GoogleIcon width="27px" height="27px" />
        Sign In with Google
      </Button>
    </Fragment>
  );
};
