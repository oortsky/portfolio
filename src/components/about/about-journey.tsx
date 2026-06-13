import { m } from "@/paraglide/messages.js";

import { ChevronDown } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { journeys } from "@/constants/journeys";

export function AboutJourney() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">{m["about_journey.title"]()}</h2>

        <p className="text-muted-foreground">
          {m["about_journey.description"]()}
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center">
{journeys.map((journey, index) => (
  <div
    key={journey}
    className="flex w-full flex-col items-center"
  >
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>
          {m[`about_journey.items.${journey}.title`]()}
        </CardTitle>

        <CardDescription>
          {m[`about_journey.items.${journey}.description`]()}
        </CardDescription>
      </CardHeader>
    </Card>

    {index !== journeys.length - 1 && (
      <ChevronDown className="my-4 size-5 text-muted-foreground" />
    )}
  </div>
))}
      </div>
    </section>
  );
}
