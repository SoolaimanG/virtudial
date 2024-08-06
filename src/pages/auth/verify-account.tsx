import { FC, useEffect, useState } from "react";
import {
  cn,
  errorMessageAndStatus,
  formatTime,
  VirtuDialAPI,
} from "../../lib/utils";
import queryString from "query-string";
import { verificationMeans } from "../../lib/types";
import { Text } from "../../components/text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { appConfigs, verifyAccountSchema } from "../../lib/data";
import { toast } from "../../components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { providerStore } from "../../lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCounter } from "@uidotdev/usehooks";

export const VerifyAccount: FC<{ className?: string }> = ({ className }) => {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const [isPending, startTransition] = useState(false);
  const [timer, { decrement, set }] = useCounter(30, { min: 0, max: 30 });
  const api = new VirtuDialAPI();
  const form = useForm<z.infer<typeof verifyAccountSchema>>({
    resolver: zodResolver(verifyAccountSchema),
  });
  const { setStatus } = providerStore();
  const qs = queryString.parse(location.search) as {
    "verification-means": verificationMeans;
  };

  const { isLoading, data, error } = useQuery<{
    data: { email: string; phoneNumber: string };
  }>({
    queryKey: ["get-account-verification-status", id],
    queryFn: () => api.getVerificationStatus(id),
  });

  const _verifyAccount = async (
    values: z.infer<typeof verifyAccountSchema>
  ) => {
    try {
      startTransition(true);
      const res = await api.verifyAccount(id, values.code);
      set(30);
      toast({
        title: `Account verified`,
        description: res.message,
      });
    } catch (error) {
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

  useEffect(() => {
    if (error) {
      const _error = errorMessageAndStatus(error);
      toast({
        title: `Something went wrong: ${_error.status}`,
        description: _error.message,
        variant: "destructive",
      });
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      decrement();
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading]);

  const _requestAccountVerification = async () => {
    try {
      startTransition(true);
      const res = await api.requestAccountVerification(
        data?.data?.email,
        data?.data?.phoneNumber,
        qs["verification-means"]
      );

      toast({ title: "Successful", description: res.message });
      set(30);
      navigate(
        appConfigs.paths.auth.verifyAccount +
          res.data.id +
          `?verification-means=${res.data.verificationMeans}`
      );
    } catch (error) {
      const _error = errorMessageAndStatus(error);
      setStatus(_error.status, _error.message);
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
    <div className={cn(className, " h-[33rem] relative")}>
      <h1 className="text-3xl bona-nova-sc-bold">Verify Account</h1>
      <h3>
        {qs["verification-means"] === "email"
          ? "Enter the 6-digit OTP sent to the email you provided"
          : qs["verification-means"] === "phoneNumber"
          ? "Enter the 6-digit OTP sent to the phone number you provided"
          : "Enter the 6-digit OTP sent to you"}
      </h3>
      <Text>
        This helps us keep your account safe and secure by verifying your
        account.
      </Text>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(_verifyAccount)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full flex items-center justify-center mt-4">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={isPending || isLoading}
            variant="primary"
            type="submit"
            className="w-full h-[3rem] mt-3"
          >
            Submit
          </Button>
        </form>
      </Form>
      <div className="w-full absolute bottom-6 items-center justify-center flex">
        <Button
          onClick={_requestAccountVerification}
          disabled={isPending || isLoading || Boolean(timer)}
          variant="link"
          className="gap-1"
        >
          {Boolean(timer) && <Text>{formatTime(timer)}</Text>} Resend OTP
        </Button>
      </div>
    </div>
  );
};
