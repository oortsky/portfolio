import { m } from "@/paraglide/messages.js";

import { ContactForm } from "./contact-form";
import { ContactWhatsapp } from "./contact-whatsapp";
import { ContactSocials } from "./contact-socials";

import { Separator } from "@/components/ui/separator";

export function ContactContent() {
  return (
    <section>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          {m["contact_content.title"]()}
        </h1>

        <p className="text-muted-foreground">
          {m["contact_content.description"]()}
        </p>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-8 lg:grid-cols-2">
        <ContactForm />

        <div>
          <ContactWhatsapp />

          <Separator className="my-10" />

          <ContactSocials />
        </div>
      </div>
    </section>
  );
}
