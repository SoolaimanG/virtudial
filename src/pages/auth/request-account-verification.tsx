import { FC, useState } from "react";
import { cn, errorMessageAndStatus, VirtuDialAPI } from "../../lib/utils";
import { Shield } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import queryString from "query-string";
import { z } from "zod";
import { appConfigs, requestAccountVerificationSchema } from "../../lib/data";
import PhoneInput from "react-phone-input-2";
import { toast } from "../../components/ui/use-toast";
import { providerStore } from "../../lib/store";
import { useNavigate } from "react-router-dom";
//

export const RequestAccountVerification: FC<{ className?: string }> = ({
  className,
}) => {
  const { setStatus } = providerStore();
  const navigate = useNavigate();
  const [isPending, startTransition] = useState(false);
  const api = new VirtuDialAPI();
  const payload = queryString.parse(location.search) as {
    email: string;
    phoneNumber: string;
  };
  //
  const form = useForm<z.infer<typeof requestAccountVerificationSchema>>({
    defaultValues: {
      email: payload.email,
      phoneNumber: payload.phoneNumber,
    },
  });
  const [active, setActive] = useState<"email" | "phoneNumber">("email");

  const _requestAccountVerification = async (
    values: z.infer<typeof requestAccountVerificationSchema>
  ) => {
    try {
      startTransition(true);
      const res = await api.requestAccountVerification(
        values.email,
        values.phoneNumber,
        active
      );

      toast({ title: "Successful", description: res.message });
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
    <div className={cn(className, "flex flex-col gap-2")}>
      <Shield size={60} />
      <h1 className="bona-nova-sc-bold font-bold text-3xl">
        Verify your account
      </h1>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        dignissimos sint quidem dolores ipsa obcaecati minus ut sit laboriosam,
        asperiores, molestias aut voluptas excepturi ipsum. Consectetur,
        obcaecati? Laborum, error illo.
      </Text>
      <Form {...form}>
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(_requestAccountVerification)}
        >
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="email"
                className="data-[state=active]:bg-blue-500"
                onClick={() => setActive("email")}
              >
                Email
              </TabsTrigger>
              <TabsTrigger
                value="phoneNumber"
                className="data-[state=active]:bg-blue-500"
                onClick={() => setActive("phoneNumber")}
              >
                Phone Number
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <FormField
                name={active === "email" ? "email" : "phoneNumber"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Text>Email</Text>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"example@gmail.com"}
                        className="h-[3rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="phoneNumber" className="w-full">
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
            </TabsContent>
          </Tabs>
          <Button
            disabled={isPending}
            type="submit"
            variant="primary"
            className="h-[3rem] w-full mt-4"
          >
            Send Code
          </Button>
        </form>
      </Form>
    </div>
  );
};
