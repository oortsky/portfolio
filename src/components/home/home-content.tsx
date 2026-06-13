import { Separator } from "@/components/ui/separator";

import { HomeHero } from "./home-hero";
import { HomeAbout } from "./home-about";
import { HomeProjects } from "./home-projects";
import { HomeBlog } from "./home-blog";

export function HomeContent() {
  return (
    <div>
      <HomeHero />

      <Separator className="my-10" />

      <HomeAbout />

      <Separator className="my-10" />

      <HomeProjects />

      <Separator className="my-10" />

      <HomeBlog />
    </div>
  );
}
