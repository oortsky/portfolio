import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages.js";

import { ContactContent } from "@/components/contact/contact-content";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      {
        title: m["seo.contact.title"]()
      },
      {
        name: "description",
        content: m["seo.contact.description"]()
      }
    ]
  })
});

function Contact() {
  return (
    <div className="container mx-auto px-6 py-8">
      <ContactContent />
    </div>
  );
}
