import { FC, useState } from "react";
import { cn, errorMessageAndStatus, VirtuDialAPI } from "../../lib/utils";
import { PartyPopper, RectangleEllipsis } from "lucide-react";
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
import { z } from "zod";
import { appConfigs, resetPasswordSchema } from "../../lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { toast } from "../../components/ui/use-toast";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../components/ui/drawer";
import { useWindowSize } from "@uidotdev/usehooks";

const PasswordChangedSuccessful: FC<{ _open?: boolean }> = ({
  _open = false,
}) => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(_open);

  const props = {
    title: "Your Password has been changed successfully",
    description:
      "Your password has been successfully updated. You can now use your new password to access your account. If you encounter any issues or need further assistance, please visit our help center or contact our support team. Remember to keep your password secure and avoid sharing it with others.",
    buttonLabel: "Go to login",
    buttonLink: appConfigs["paths"]["auth"]["signIn"],
  };

  const renderr =
    Number(width) > 767 ? (
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center w-full">
              <div className="p-5 rounded-full bg-slate-900">
                <PartyPopper size={60} />
              </div>
            </div>
            <DialogTitle className="text-xl bona-nova-sc-bold">
              {props.title}
            </DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="primary" asChild className="h-[3rem]">
                <Link to={props.buttonLink}>{props.buttonLabel}</Link>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={open} onOpenChange={(e) => setOpen(e)}>
        <DrawerContent>
          <DrawerHeader>
            <div className="flex items-center justify-center w-full">
              <div className="p-5 rounded-full bg-slate-900">
                <PartyPopper size={60} />
              </div>
            </div>
            <DrawerTitle className="text-xl bona-nova-sc-bold">
              {props.title}
            </DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="primary" asChild className="h-[3rem]">
                <Link to={props.buttonLink}>{props.buttonLabel}</Link>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return renderr;
};

export const ResetPassword: FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams() as { id: string };
  const api = new VirtuDialAPI();
  const [isPending, startTransition] = useState(false);
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const _resetPassword = async (
    values: z.infer<typeof resetPasswordSchema>
  ) => {
    try {
      startTransition(true);
      await api.resetPassword(values.password, id);
      setOpen(true);
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
      <PasswordChangedSuccessful _open={open} key={String(open)} />
      <RectangleEllipsis size={60} />
      <h1 className="bona-nova-sc-bold text-3xl">Set new password</h1>
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit ratione
        fugiat similique consequatur nam maiores, aperiam nostrum ipsum numquam
        molestiae.
      </Text>
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(_resetPassword)}
          className="mt-3 flex flex-col gap-3"
        >
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
          <Button
            disabled={isPending}
            variant="primary"
            type="submit"
            className="h-[3rem] w-full"
          >
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
};
