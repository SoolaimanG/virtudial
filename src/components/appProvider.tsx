import { FC, ReactNode, useState } from "react";
import { providerStore } from "../lib/store";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Login } from "../pages/auth/login";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Text } from "./text";

const LoginDialogOrModal: FC<{
  _title?: string;
  _description?: string;
  _open?: boolean;
}> = ({ _title, _description, _open }) => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(_open);

  const props = {
    title: _title || "Welcome Back",
    description: _description || "",
    content: Login,
  };

  const renderr =
    Number(width) > 767 ? (
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>{props.description}</DialogDescription>
          </DialogHeader>
          <props.content />
        </DialogContent>
      </Dialog>
    ) : (
      <Drawer open={open} onOpenChange={(e) => setOpen(e)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{props.title}</DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <props.content />
        </DrawerContent>
      </Drawer>
    );

  return renderr;
};

const DisabledFeature: FC<{ _open?: boolean; _message?: string }> = ({
  _open = false,
  _message = "",
}) => {
  const form = useForm();
  const [open, setOpen] = useState(_open);
  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            This feature is either disabled or not yet available
          </DialogTitle>
          <DialogDescription>
            {_message ||
              "The requested feature is currently inaccessible. Please check back later or contact support for more information."}
          </DialogDescription>
        </DialogHeader>
        <Text>
          Join our newsletter to receive the latest updates and important
          information about our company.
        </Text>
        <Form {...form}>
          <form action="" className="w-full flex items-center gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="example@gmail.com" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button variant="primary">Join</Button>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { status, loginProps } = providerStore();

  return (
    <div className="w-full h-full">
      {/* This will open up when a user tries to sign-up but already got an account */}
      <LoginDialogOrModal
        key={status.status}
        _open={status.status === "LOGIN"}
        _title={loginProps.title}
        _description={loginProps.description}
      />

      {/* This will trigger when a use tries to use a feature that is either disabled or not available */}
      <DisabledFeature
        key={status.status}
        _open={status.status === "NOT-YET-AVAILABLE"}
        _message={status.message}
      />

      {children}
    </div>
  );
};
