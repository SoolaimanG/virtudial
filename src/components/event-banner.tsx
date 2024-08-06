import { FC, ReactNode, useState } from "react";
import { MaxScreenSize } from "./max-screen-size";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { BackgroundBeams } from "./background-beam";
import { ShiningButton } from "./ui/shining-button";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./text";
import { z } from "zod";
import { joinWaitListSchema } from "../lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { _joinWaitList } from "../lib/utils";

const Modal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();
  const form = useForm<z.infer<typeof joinWaitListSchema>>({
    resolver: zodResolver(joinWaitListSchema),
  });

  const _modal = {
    title: "Join our newsletter today",
    description:
      "Stay updated with the latest news, exclusive offers, and valuable insights by subscribing to our newsletter. Get tips, industry updates, and special promotions delivered directly to your inbox. Don’t miss out on any updates – join our community now!",
    form: (
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full">
            <Text>Email address</Text>
            <FormControl>
              <Input {...field} placeholder="Email" className="w-full" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
  };

  return Number(width) > 767 ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-3xl">{_modal.title}</DialogTitle>
        <DialogDescription>{_modal.description}</DialogDescription>
        <Form {...form}>
          <form
            action=""
            className="flex flex-col items-center gap-3 w-full justify-center mt-5"
            onSubmit={form.handleSubmit((values) =>
              _joinWaitList(values, form.reset)
            )}
          >
            1{_modal["form"]}
            <DialogFooter className="w-full p-0">
              <DialogClose asChild>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="p-2">
        <DrawerTitle className="text-3xl">{_modal.title}</DrawerTitle>
        <DrawerDescription>{_modal.description}</DrawerDescription>
        <Form {...form}>
          <form
            action=""
            className="flex flex-col items-center gap-3 w-full justify-center mt-5"
            onSubmit={form.handleSubmit((values) =>
              _joinWaitList(values, form.reset)
            )}
          >
            {_modal["form"]}
            <DrawerFooter className="w-full p-0">
              <DrawerClose asChild>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export const EventBanner: FC<{}> = () => {
  return (
    <MaxScreenSize className="md:mt-5">
      <Card className="p-0 w-full">
        <CardContent className="py-6 px-3 flex flex-col items-center justify-center gap-3 relative w-full md:h-[23rem] h-[20rem]">
          <BackgroundBeams />
          <CardTitle className="text-5xl text-center">
            Join our <span className="text-blue-500">news</span>letters
          </CardTitle>
          <p className="flex items-center gap-1">
            <CardDescription>+10k Users, a</CardDescription>
            Hot Subscription feature for users
          </p>
          <Badge variant="primary" className="w-fit">
            #1 Virtual Number Company
          </Badge>

          <Modal>
            <ShiningButton className="rounded-3xl">
              Join NewLetter
            </ShiningButton>
          </Modal>

          {/*  */}
        </CardContent>
      </Card>
    </MaxScreenSize>
  );
};
