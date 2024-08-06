import { FC, useState } from "react";
import { cn, errorMessageAndStatus, VirtuDialAPI } from "../../lib/utils";
import { FingerprintIcon } from "lucide-react";
import { Text } from "../../components/text";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { requestForgetPasswordSchema } from "../../lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../components/ui/use-toast";

export const ForgetPassword: FC<{ className?: string }> = ({ className }) => {
  const api = new VirtuDialAPI();
  const [isPending, startTransition] = useState(false);
  const form = useForm<z.infer<typeof requestForgetPasswordSchema>>({
    resolver: zodResolver(requestForgetPasswordSchema),
  });

  const _requestForgetPasswordChange = async (
    values: z.infer<typeof requestForgetPasswordSchema>
  ) => {
    try {
      startTransition(true);
      const res = await api.requestForgetPasswordChange(values.id || "");
      toast({
        title: `Request made successfully`,
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

  return (
    <div className={cn(className, "")}>
      <FingerprintIcon size={70} />
      <h1 className="text-4xl bona-nova-sc-bold">Forgot password?</h1>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, illum
        debitis! Voluptatum obcaecati soluta enim, eveniet id, earum quo
        dignissimos consequatur ratione cum quos aliquid corporis laboriosam in
        dolores excepturi?
      </Text>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(_requestForgetPasswordChange)}
          className="mt-3"
        >
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Text>Email or Password</Text>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="email or phone-number"
                    className="h-[3rem]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            variant="primary"
            className="h-[3rem] w-full mt-3"
          >
            Request Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};
