import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { m } from "@/paraglide/messages.js";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { Send, Trash } from "lucide-react";

import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, m["contact_form.validation.name_min"]())
    .max(50, m["contact_form.validation.name_max"]()),

  email: z.string().trim().email(m["contact_form.validation.email_invalid"]()),

  message: z
    .string()
    .trim()
    .min(20, m["contact_form.validation.message_min"]())
    .max(1000, m["contact_form.validation.message_max"]())
});

export function ContactForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },

    validators: {
      onSubmit: formSchema
    },

    onSubmit: async ({ value }) => {
      try {
        const data = {
          title: "Portfolio",
          time: new Date().toLocaleString("id-ID"),
          ...value
        };

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID!,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
          data,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
        );

        toast(m["contact_form.actions.toast.success"](), {
          position: "bottom-right"
        });

        confetti({
          particleCount: 150,
          spread: 60
        });

        form.reset();
      } catch (error) {
        toast(m["contact_form.actions.toast.failed"](), {
          position: "bottom-right"
        });

        console.error(error);
      }
    }
  });

  return (
    <form
      id="contact-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>{m["contact_form.title"]()}</FieldLegend>

          <FieldDescription>{m["contact_form.description"]()}</FieldDescription>

          <Separator />

          <FieldGroup>
            <form.Field
              name="name"
              children={field => {
                const isTouched = field.state.meta.isTouched;

                const isInvalid = isTouched && !field.state.meta.isValid;

                const isValid =
                  isTouched &&
                  field.state.meta.isValid &&
                  field.state.value.trim().length >= 3;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {m["contact_form.fields.name.label"]()}{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      autoComplete="name"
                      placeholder={m["contact_form.fields.name.placeholder"]()}
                      aria-invalid={isInvalid}
                    />

                    <FieldDescription className="flex items-center gap-2">
                      <Checkbox checked={isValid} disabled id="name-checkbox" />

                      <Label
                        htmlFor="name-checkbox"
                        className={
                          isValid ? "line-through text-muted-foreground" : ""
                        }
                      >
                        {m["contact_form.fields.name.hint"]()}
                      </Label>
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="email"
              children={field => {
                const value = field.state.value ?? "";

                const isTouched = field.state.meta.isTouched;

                const isInvalid = isTouched && !field.state.meta.isValid;

                const isValid =
                  isTouched &&
                  field.state.meta.isValid &&
                  value.length > 0 &&
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {m["contact_form.fields.email.label"]()}{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                      autoComplete="email"
                      placeholder={m["contact_form.fields.email.placeholder"]()}
                      aria-invalid={isInvalid}
                    />

                    <FieldDescription className="flex items-center gap-2">
                      <Checkbox
                        id="email-checkbox"
                        checked={isValid}
                        disabled
                      />

                      <Label
                        htmlFor="email-checkbox"
                        className={
                          isValid ? "line-through text-muted-foreground" : ""
                        }
                      >
                        {m["contact_form.fields.email.hint"]()}
                      </Label>
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="message"
              children={field => {
                const isTouched = field.state.meta.isTouched;

                const isInvalid = isTouched && !field.state.meta.isValid;

                const isValid =
                  isTouched &&
                  field.state.meta.isValid &&
                  field.state.value.trim().length >= 20;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      {m["contact_form.fields.message.label"]()}{" "}
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupTextarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        rows={6}
                        placeholder={m[
                          "contact_form.fields.message.placeholder"
                        ]()}
                        aria-invalid={isInvalid}
                        className="resize-none"
                      />

                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.state.value.length}/1000
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    <FieldDescription className="flex items-center gap-2">
                      <Checkbox
                        checked={isValid}
                        disabled
                        id="message-checkbox"
                      />

                      <Label
                        htmlFor="message-checkbox"
                        className={
                          isValid ? "line-through text-muted-foreground" : ""
                        }
                      >
                        {m["contact_form.fields.message.hint"]()}
                      </Label>
                    </FieldDescription>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            <Trash /> {m["contact_form.actions.reset"]()}
          </Button>

          <Button type="submit">
            <Send /> {m["contact_form.actions.submit"]()}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
