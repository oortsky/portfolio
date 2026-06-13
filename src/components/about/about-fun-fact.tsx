import { useState } from "react";
import { m } from "@/paraglide/messages.js";

import { funFacts } from "@/constants/fun-facts";

export function AboutFunFact() {
  const [fact, setFact] = useState<string | null>(null);

function revealFact() {
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  const id = funFacts[randomIndex];

  setFact(m[`about_fun_fact.items.${id}`]());
}

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">
          {m["about_fun_fact.title"]()}
        </h2>

        <p className="text-muted-foreground">
          {m["about_fun_fact.description"]()}
        </p>
      </div>

      <div className="flex h-96 flex-col items-center justify-center gap-8 text-center">
        <button
          type="button"
          onClick={revealFact}
          className="cursor-pointer select-none text-8xl transition-transform hover:scale-110 active:scale-95"
        >
          🎲
        </button>

        <div className="min-h-16 max-w-sm">
          {fact ? (
            <p className="font-medium">{fact}</p>
          ) : (
            <p className="text-muted-foreground">
              {m["about_fun_fact.empty_label"]()}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
