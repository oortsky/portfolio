import { SocialIcons } from "@/components/social-icons";
import { m } from "@/paraglide/messages.js";

import { SOCIALS } from "@/constants";

export function AboutIntroduction() {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold">{m["about_intro.title"]()}</h1>

      <p className="text-muted-foreground">
        {m["about_intro.content"]()}
      </p>

      <SocialIcons data={SOCIALS} />
    </section>
  );
}
