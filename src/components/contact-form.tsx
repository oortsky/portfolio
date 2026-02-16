"use client";

import * as React from "react";
import { useEffect } from "react";
import { playSound, preloadSound } from "@/lib/sound";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { Trash, Send } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must be at most 33 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(200, "Message must be at most 200 characters.")
});

export function ContactForm() {
  useEffect(() => {
    preloadSound("click", "/assets/sound/click.mp3");
    preloadSound("success", "/assets/sound/success.mp3");
    preloadSound("error", "/assets/sound/error.mp3");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    playSound("click", { volume: 0.4 });

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          playSound("success", { volume: 0.6 });

          toast("Message sent successfully!", {
            position: "bottom-right"
          });

          confetti({
            particleCount: 150,
            spread: 60
          });

          form.reset();
        },
        error => {
          playSound("error", { volume: 0.6 });

          toast("Failed to send message. Please try again.", {
            position: "bottom-right"
          });
        }
      );
  }

  return (
    <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Contact Me</FieldLegend>
          <FieldDescription>
            You can contact me via email easily by filling out the form below.
          </FieldDescription>
          <Separator className="bg-primary" />
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-name">
                    Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="What's your name?"
                    autoComplete="off"
                    required
                  />
                  <FieldDescription className="flex gap-2 items-center">
                    <Checkbox
                      checked={!fieldState.invalid && fieldState.isDirty}
                      id="name-checkbox"
                      name="name-checkbox"
                      className="rounded-full"
                      disabled
                    />{" "}
                    <Label
                      htmlFor="name-checkbox"
                      className={`${!fieldState.invalid && fieldState.isDirty ? "line-through text-muted-foreground" : ""}`}
                    >
                      Enter your name at least 3 characters.
                    </Label>
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-email">
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="contact-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="What's your email address?"
                    autoComplete="off"
                    required
                  />
                  <FieldDescription className="flex gap-2 items-center">
                    <Checkbox
                      checked={!fieldState.invalid && fieldState.isDirty}
                      id="email-checkbox"
                      name="email-checkbox"
                      className="rounded-full"
                      disabled
                    />{" "}
                    <Label
                      htmlFor="email-checkbox"
                      className={`${!fieldState.invalid && fieldState.isDirty ? "line-through text-muted-foreground" : ""}`}
                    >
                      Enter your valid email.
                    </Label>
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contact-form-message">
                    Message <span className="text-destructive">*</span>
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="contact-form-message"
                      placeholder="Hi, nice to meet you. Can you help me..."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/200 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription className="flex gap-2 items-center">
                    <Checkbox
                      checked={!fieldState.invalid && fieldState.isDirty}
                      id="message-checkbox"
                      name="message-checkbox"
                      className="rounded-full"
                      disabled
                    />{" "}
                    <Label
                      htmlFor="email-checkbox"
                      className={`${!fieldState.invalid && fieldState.isDirty ? "line-through text-muted-foreground" : ""}`}
                    >
                      Enter your message at least 20 characters.
                    </Label>
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="glossy-accent"
            onClick={() => {
              playSound("click", { volume: 0.4 });
              form.reset();
            }}
          >
            <Trash className="size-4" /> Reset
          </Button>
          <Button variant="glossy" type="submit" form="contact-form">
            <Send className="size-4" /> Submit
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
