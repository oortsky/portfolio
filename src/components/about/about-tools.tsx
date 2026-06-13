import { Icon } from "@iconify/react";
import { m } from "@/paraglide/messages.js";

import { tools } from "@/constants/tools";

export function AboutTools() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold"> {m["about_tools.title"]()}</h2>

        <p className="text-muted-foreground">{m["about_tools.description"]()}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {tools.map(tool => (
          <div
            key={tool.name}
            className="flex flex-col items-center gap-2 rounded-lg border p-4"
          >
            <Icon icon={tool.icon} className="size-10" />

            <span className="text-center text-xs">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
