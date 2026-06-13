import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages.js";

import { AboutContent } from "@/components/about/about-content";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      {
        title: m["seo.about.title"]()
      },
      {
        name: "description",
        content: m["seo.about.description"]()
      }
    ]
  })
});

function About() {
  return (
    <div className="container mx-auto px-6 py-8">
      <AboutContent />
    </div>
  );
}
