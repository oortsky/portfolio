import { m } from "@/paraglide/messages.js";

export function HomeAbout() {
  return (
    <section className="grid gap-8 md:grid-cols-2">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {m.home_about_what_i_do_title()}
        </h2>

        <p className="text-muted-foreground">
          {m.home_about_what_i_do_content()}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          {m.home_about_currently_building_title()}
        </h2>

        <p className="text-muted-foreground">
          {m.home_about_currently_building_content()}
        </p>
      </div>
    </section>
  );
}