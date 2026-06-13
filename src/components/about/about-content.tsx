import { Separator } from "@/components/ui/separator";

import { AboutPhoto } from "./about-photo";
import { AboutIntroduction } from "./about-introduction";
import { AboutJourney } from "./about-journey";
import { AboutSkills } from "./about-skills";
import { AboutTools } from "./about-tools";
import { AboutFunFact } from "./about-fun-fact";
import { AboutTimeline } from "./about-timeline";

export function AboutContent() {
  return (
    <div>
      <div className="grid gap-8 md:grid-cols-2">
        <AboutPhoto />
        <AboutIntroduction />
      </div>

      <Separator className="my-10" />

      <div className="grid gap-8 md:grid-cols-2">
        <AboutJourney />

        <div className="grid gap-8 md:grid-cols-2">
          <AboutSkills />
          <AboutTools />
        </div>
      </div>

      <Separator className="my-10" />

      <div className="grid gap-8 lg:grid-cols-2">
        <AboutFunFact />
        <AboutTimeline />
      </div>
    </div>
  );
}
