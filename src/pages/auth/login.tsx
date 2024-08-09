import { FC, useState } from "react";
import { Text } from "../../components/text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { appConfigs, localLoginSchema } from "../../lib/data";
import {
  errorMessageAndStatus,
  getCallbackUrl,
  VirtuDialAPI,
} from "../../lib/utils";
import { z } from "zod";
import { toast } from "../../components/ui/use-toast";
import { providerStore } from "../../lib/store";
import { ContinueWithGoogle } from "../../components/continue-with-google";

export const Login: FC<{ isPage?: boolean }> = ({ isPage = false }) => {
  const api = new VirtuDialAPI();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof localLoginSchema>>();
  const { setStatus } = providerStore();
  const [isPending, startTransition] = useState(false);

  const _login = async (values: z.infer<typeof localLoginSchema>) => {
    try {
      startTransition(true);
      const res = await api.loginUser(values.email, values.password);

      if (!res.data.isAccountVerified) {
        return navigate(
          appConfigs.paths.auth.verifyAccount +
            `?email=${res.data.email}&phoneNumber=${res.data.phoneNumber}`
        );
      }

      const callbackUrl = getCallbackUrl();
      navigate(callbackUrl.callbackUrl || "/");
    } catch (error) {
      const _error = errorMessageAndStatus(error);
      setStatus(_error.status);
      toast({
        title: `Something went wrong: ${_error.status}`,
        description: _error.message,
        variant: "destructive",
      });
    } finally {
      startTransition(false);
    }
  };

  return (
    <div className="py-14">
      {isPage && (
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold bona-nova-sc-bold">
            Welcome Back
          </h1>
          <Text>Please enter your login details to login your account.</Text>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(_login)}
          action=""
          className="mt-3 flex flex-col gap-3"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Text>Email</Text>
                <FormControl>
                  <Input
                    {...field}
                    className="h-[3rem]"
                    placeholder="johndoe@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Text>Password</Text>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="h-[3rem]"
                    placeholder="JohnDoe2k2four$"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-end justify-end w-full">
            <Link
              to={appConfigs.paths.auth.forgetPassword}
              className="hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Button disabled={isPending} variant="primary" className="h-[3rem]">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="w-full flex items-center gap-1 mt-2">
        <hr className="w-full" />
        <Text>Or</Text>
        <hr className="w-full" />
      </div>
      <ContinueWithGoogle />
      <Text className="text-center w-full mt-3">
        {"Don't have an account?"}{" "}
        <Link
          to={appConfigs.paths.auth.signUp}
          className="text-blue-500 font-semibold"
        >
          Sign Up
        </Link>
      </Text>
    </div>
  );
};
