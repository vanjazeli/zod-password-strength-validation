import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button, Input, Checkbox, Label } from "@/components";
import useMainForm from "./useMainForm";
import { mainFormSchema } from "./mainFormSchema";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const MainForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState("");

  const form = useMainForm();

  const handleSubmit = (values: z.infer<typeof mainFormSchema>) => {
    setCodeSnippet(JSON.stringify(values, null, 2));
    setIsOpen(true);
  };

  return (
    <div className="px-5 max-w-[400px] mx-auto">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Registration</h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">Production-level example of how to leverage Zod for password strength validation in combination with shadcn/ui, React Hook Form, and React.</p>
      <p className="text-xs text-muted-foreground [&:not(:first-child)]:mt-6">Input a password to trigger the strength validation.</p>
      <Form {...form}>
        <form className="flex flex-col gap-5 [&:not(:first-child)]:mt-6" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className={form.formState.errors.username ? "ring-1 ring-destructive focus-visible:ring-destructive" : ""} placeholder="Username" {...field} spellCheck={false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className={form.formState.errors.email ? "ring-1 ring-destructive focus-visible:ring-destructive" : ""} placeholder="Email" type="email" {...field} spellCheck={false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const errors = Object.values(form.formState.errors.password?.types ?? {}).flat();

              return (
                <FormItem>
                  <FormControl>
                    <Input className={form.formState.errors.password ? "ring-1 ring-destructive focus-visible:ring-destructive" : ""} placeholder="Password" type="password" {...field} />
                  </FormControl>
                  {errors.length > 0 && (
                    <>
                      <div className="h-2 overflow-hidden rounded-sm border shadow-sm grid grid-cols-3">
                        {errors.map((_, index) => (
                          <div className={`bg-destructive ${index !== errors.length - 1 ? "border-r" : ""}`} key={`bar-${index}`} />
                        ))}
                      </div>
                      {errors.map((error, index) => (
                        <p className="text-[0.8rem] font-medium text-destructive" key={`error-${index}`}>
                          {error}
                        </p>
                      ))}
                    </>
                  )}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className={form.formState.errors.confirmPassword ? "ring-1 ring-destructive focus-visible:ring-destructive" : ""} placeholder="Confirm password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms-and-conditions" checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} />
                    <Label htmlFor="terms-and-conditions">I accept and agree to the terms of service and privacy policy.</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signToNewsletter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox id="sign-to-newsletter" checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} />
                    <Label htmlFor="sign-to-newsletter">Sign me up to receive updates, exclusive offers, and promotions via email.</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Success!</h2>
          </DialogHeader>
          <DialogDescription>
            <p className="leading-7 [&:not(:first-child)]:mt-6">You have successfully fake-sumbitted the form!</p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">Your form data:</p>
            <SyntaxHighlighter className="[&:not(:first-child)]:mt-6" language="javascript" style={vscDarkPlus}>
              {codeSnippet}
            </SyntaxHighlighter>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
