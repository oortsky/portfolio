import { Icon } from "@iconify/react";
import { m } from "@/paraglide/messages.js";

import { skills } from "@/constants/skills";

export function AboutSkills() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold"> {m["about_skills.title"]()}</h2>

        <p className="text-muted-foreground">
          {m["about_skills.description"]()}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {skills.map(skill => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-2 rounded-lg border p-4"
          >
            <Icon icon={skill.icon} className="size-10" />

            <span className="text-center text-xs">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
