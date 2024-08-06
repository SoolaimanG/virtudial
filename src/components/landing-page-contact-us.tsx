import { Phone } from "lucide-react";
import { MaxScreenSize } from "./max-screen-size";
import { Badge } from "./ui/badge";
import { Text } from "./text";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { appConfigs, messageSupportSchema, virtuDialFAQ } from "../lib/data";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { errorMessageAndStatus, VirtuDialAPI } from "../lib/utils";
import { useState } from "react";

export const LandingPageContactPage = () => {
  const [isPending, startTransition] = useState(false);
  const api = new VirtuDialAPI();
  const form = useForm<z.infer<typeof messageSupportSchema>>({
    resolver: zodResolver(messageSupportSchema),
  });

  const _messageSupport = async (
    values: z.infer<typeof messageSupportSchema>
  ) => {
    startTransition(true);
    try {
      const res = await api.messageSupport(
        values.name,
        values.userEmail,
        values.message
      );
      toast({ title: "Success", description: res.message });
      form.reset();
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
    <MaxScreenSize className="p-2 md:p-0 md:mt-5 flex items-center flex-col justify-center">
      <Badge
        variant="outline"
        className="w-fit rounded-sm flex items-center gap-2"
      >
        <Phone />
        Contact us
      </Badge>
      <h1 className="text-3xl font-semibold text-center">
        Get in contact with us today.
      </h1>
      <Text className="text-center">
        We’re here to help you with any questions, concerns, or support you may
        need. Whether you're a current user or considering {appConfigs["name"]}{" "}
        for your business, feel free to reach out to us through any of the
        following methods
      </Text>
      <div className="flex flex-col md:flex-row w-full gap-4 md:h-[28rem] overflow-hidden mt-6">
        <Accordion type="multiple" className="w-full md:w-[50%] overflow-auto">
          {virtuDialFAQ.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(_messageSupport)}
            action=""
            className="flex flex-col gap-2 w-full md:w-[50%]"
          >
            <h1 className="text-3xl font-semibold text-blue-500 opacity-55">
              Talk to our experts about anything
            </h1>
            <Text>
              Fill out our online contact form with your details and message.
              Our team will review your submission and get back to you as soon
              as possible.
            </Text>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Text>Full Name</Text>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <Text>Email</Text>
                  <FormControl>
                    <Input {...field} placeholder="Johndoe@example.com" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Text>Message</Text>
                  <FormControl>
                    <Textarea {...field} placeholder="Type your message here" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isPending} variant="primary">
              Send
            </Button>
          </form>
        </Form>
      </div>
    </MaxScreenSize>
  );
};
//
