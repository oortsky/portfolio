"use client";

import * as React from "react";
import { useEffect } from "react";
import { playSound, preloadSound } from "@/lib/sound";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ChevronDownIcon, MessageCircleMore, Trash, Send } from "lucide-react";

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
import { PhoneInput } from "@/components/ui/phone-input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Item,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemMedia,
  ItemTitle
} from "@/components/ui/item";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(30, "Name must be at most 30 characters."),
  phone: z.string().min(1, "Phone number is required"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters.")
    .max(200, "Message must be at most 200 characters.")
});

export function WhatsappForm() {
  useEffect(() => {
    preloadSound("click", "/assets/sound/click.mp3");
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      message: ""
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    playSound("click", { volume: 0.4 });

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
    const fullMessage = `Name: ${data.name}\nPhone: ${data.phone}\n\n${data.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappUrl, "_blank");
    toast.success("Opening WhatsApp...", {
      position: "bottom-right"
    });
    form.reset();
  }

  return (
    <form id="whatsapp-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldLegend>Are you a WhatsApp user?</FieldLegend>
        <FieldDescription>
          You can also contact me via WhatsApp.
        </FieldDescription>
        <Card className="mx-auto w-full">
          <CardContent className="p-0">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Item className="group w-full">
                  <ItemMedia>
                    <MessageCircleMore className="size-5" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>WhatsApp Me</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                  </ItemActions>
                </Item>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col items-start gap-6 p-4">
                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="whatsapp-form-name">
                            Name <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            id="whatsapp-form-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Bayu Aprio Pamungkas"
                            autoComplete="off"
                            required
                          />
                          <FieldDescription className="flex gap-2 items-center">
                            <Checkbox
                              checked={
                                !fieldState.invalid && fieldState.isDirty
                              }
                              id="name-checkbox"
                              className="rounded-full"
                              disabled
                            />
                            <Label
                              htmlFor="name-checkbox"
                              className={`${!fieldState.invalid && fieldState.isDirty ? "line-through text-muted-foreground" : ""}`}
                            >
                              Enter your name at least 3 characters.
                            </Label>
                          </FieldDescription>
                          {fieldState.invalid && fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="whatsapp-form-phone">
                            Phone <span className="text-destructive">*</span>
                          </FieldLabel>
                          <PhoneInput
                            {...field}
                            id="whatsapp-form-phone"
                            aria-invalid={fieldState.invalid}
                            placeholder="+62 812 3456 7890"
                            autoComplete="off"
                            required
                          />
                          <FieldDescription className="flex gap-2 items-center">
                            <Checkbox
                              checked={
                                !fieldState.invalid && fieldState.isDirty
                              }
                              id="phone-checkbox"
                              className="rounded-full"
                              disabled
                            />
                            <Label
                              htmlFor="phone-checkbox"
                              className={`${!fieldState.invalid && fieldState.isDirty ? "line-through text-muted-foreground" : ""}`}
                            >
                              Enter your valid phone number.
                            </Label>
                          </FieldDescription>
                          {fieldState.invalid && fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="message"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="whatsapp-form-message">
                            Message <span className="text-destructive">*</span>
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="whatsapp-form-message"
                              placeholder="Hi, good morning. I want you to... "
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
                              checked={
                                !fieldState.invalid && fieldState.isDirty
                              }
                              id="message-checkbox"
                              className="rounded-full"
                              disabled
                            />
                            <Label
                              htmlFor="message-checkbox"
                              className={`${!fieldState.invalid && fieldState.isDirty ? "line-through text-muted-foreground" : ""}`}
                            >
                              Enter your message at least 20 characters.
                            </Label>
                          </FieldDescription>
                          {fieldState.invalid && fieldState.error && (
                            <FieldError>{fieldState.error.message}</FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <Field orientation="horizontal" className="w-full">
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
                    <Button variant="glossy" type="submit" form="whatsapp-form">
                      <Send className="size-4" /> Submit
                    </Button>
                  </Field>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </FieldSet>
    </form>
  );
}
