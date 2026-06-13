import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { m } from "@/paraglide/messages.js";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from "@/components/ui/field";

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
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle
} from "@/components/ui/item";

import { ChevronDown, MessageCircleMore, Send, Trash } from "lucide-react";

const formSchema = z.object({
  message: z
    .string()
    .trim()
    .min(20, m["contact_whatsapp.validation.message_min"]())
    .max(1000, m["contact_whatsapp.validation.message_max"]())
});

export function ContactWhatsapp() {
  const form = useForm({
    defaultValues: {
      message: ""
    },

    validators: {
      onSubmit: formSchema
    },

    onSubmit: async ({ value }) => {
      console.log(value);

      form.reset();
    }
  });

  return (
    <form
      id="whatsapp-form"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldSet>
        <FieldLegend>{m["contact_whatsapp.title"]()}</FieldLegend>

        <FieldDescription>
          {m["contact_whatsapp.description"]()}
        </FieldDescription>

        <Card className="mx-auto w-full">
          <CardContent className="p-0">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Item className="group w-full">
                  <ItemMedia variant="icon">
                    <MessageCircleMore />
                  </ItemMedia>

                  <ItemContent>
                    <ItemTitle>
                      {m["contact_whatsapp.collapsible.title"]()}
                    </ItemTitle>
                  </ItemContent>

                  <ItemActions>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]:rotate-180" />
                  </ItemActions>
                </Item>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="flex flex-col gap-6 p-4">
                  <FieldGroup>
                    <form.Field name="message">
                      {field => {
                        const {
                          value,
                          meta: { isTouched, isValid, errors }
                        } = field.state;

                        const length = value.length;

                        const showError = isTouched && !isValid;

                        const showSuccess =
                          isTouched && isValid && value.trim().length >= 20;

                        return (
                          <Field data-invalid={showError}>
                            <FieldLabel htmlFor={field.name}>
                              {m["contact_whatsapp.field.message.label"]()} <span className="text-destructive">*</span>
                            </FieldLabel>

                            <InputGroup>
                              <InputGroupTextarea
                                id={field.name}
                                name={field.name}
                                rows={6}
                                value={value}
                                placeholder={m[
                                  "contact_whatsapp.field.message.placeholder"
                                ]()}
                                className="resize-none"
                                aria-invalid={showError}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
                              />

                              <InputGroupAddon align="block-end">
                                <InputGroupText className="tabular-nums">
                                  {length}/1000
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>

                            <FieldDescription className="flex items-center gap-2">
                              <Checkbox
                                id="message-checkbox"
                                checked={showSuccess}
                                disabled
                              />

                              <Label
                                htmlFor="message-checkbox"
                                className={
                                  showSuccess
                                    ? "text-muted-foreground line-through"
                                    : ""
                                }
                              >
                                {m["contact_whatsapp.field.message.hint"]()}
                              </Label>
                            </FieldDescription>

                            {showError && <FieldError errors={errors} />}
                          </Field>
                        );
                      }}
                    </form.Field>
                  </FieldGroup>

                  <Field orientation="horizontal">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      <Trash />
                      {m["contact_whatsapp.actions.reset"]()}
                    </Button>

                    <Button type="submit">
                      <Send />
                      {m["contact_whatsapp.actions.submit"]()}
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
