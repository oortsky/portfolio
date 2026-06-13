import { ScrollArea } from "@/components/ui/scroll-area";
import { m } from "@/paraglide/messages.js";

import { timeline } from "@/constants/timeline";

export function AboutTimeline() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">
          {" "}
          {m["about_timeline.title"]()}
        </h2>

        <p className="text-muted-foreground">
          {m["about_timeline.description"]()}
        </p>
      </div>

      <ScrollArea className="h-96 pr-4">
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={item.year} className="relative pl-8">
              {index !== timeline.length - 1 && (
                <div className="absolute left-[11px] top-6 h-full w-px bg-border" />
              )}

              <div className="absolute left-0 top-1 size-6 rounded-full border-4 border-background bg-primary" />

              <div>
                <p className="text-sm font-semibold text-primary">
                  {item.year}
                </p>

                <h3 className="mt-1 font-semibold">
                  {m[`about_timeline.items.${item.id}.title`]()}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {m[`about_timeline.items.${item.id}.description`]()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
