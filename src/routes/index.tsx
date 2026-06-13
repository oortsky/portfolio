import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages.js";

import { HomeContent } from "@/components/home/home-content";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
  meta: [
    {
      title: m["seo.home.title"]()
    },
    {
      name: "description",
      content: m["seo.home.description"]()
    }
  ]
})
});

function Index() {
  return (
    <div className="container mx-auto px-6 py-8">
      <HomeContent />
    </div>
  );
}