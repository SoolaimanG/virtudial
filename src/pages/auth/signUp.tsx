import { FC, useState } from "react";
import { cn, errorMessageAndStatus, VirtuDialAPI } from "../../lib/utils";
import { Text } from "../../components/text";
import { Link } from "react-router-dom";
import { appConfigs, signUpSchema } from "../../lib/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../components/ui/use-toast";
import phoneNumber from "libphonenumber-js";
import { providerStore } from "../../lib/store";

export const SignUp: FC<{ className?: string }> = ({ className }) => {
  const api = new VirtuDialAPI();
  const [isPending, startTransition] = useState(false);
  const { setStatus, setLoginProps } = providerStore();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const _createUser = async (values: z.infer<typeof signUpSchema>) => {
    startTransition(true);
    try {
      const parse = phoneNumber(values.phoneNumber);
      const res = await api.createUser(
        values.email,
        values.phoneNumber,
        parse?.country || "NG",
        values.password,
        values.agreeToAdvertisingEmails
      );
      console.log({ res });
      //   Verify email address below
    } catch (error) {
      const _error = errorMessageAndStatus(error);
      setStatus(_error.status);
      setLoginProps({
        title: "Looks like you have an account with us.",
        description:
          "To continue, please sign in using your existing credentials. If you've forgotten your password, you can reset it using the 'Forgot Password' option.",
      });
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
    <div className={cn(className, "")}>
      <h1 className="bona-nova-sc-bold text-5xl">Get Started</h1>
      <Text>
        Already have an account?{" "}
        <Link
          to={appConfigs.paths.auth.signIn}
          className="text-blue-500 hover:underline"
        >
          Sign In
        </Link>
      </Text>
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(_createUser)}
          className="mt-8 flex flex-col gap-3"
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
                    placeholder="johndoe@example.com"
                    className="h-[3rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Text>Phone Number</Text>
                <FormControl>
                  <PhoneInput {...field} />
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
                    placeholder="Johndoe2k2four$"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agreeToAdvertisingEmails"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <Text>Agree to send advertising emails</Text>
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
            disabled={isPending}
            variant="primary"
            className="h-[3rem] mt-4 bona-nova-sc-bold"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
};
