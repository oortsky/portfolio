"use client";

import { useI18n } from "@/locales/client";
import Image from "next/image";
import Link from "next/link";
import { Link as Navigator } from "react-scroll";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// import { ManekiNeko } from "@/components/maneki-neko";
import { TechBadges } from "@/components/tech-badges";
// import { MagneticButton } from "@/components/magnetic-button";
import { SplashWrapper } from "@/components/splash-wrapper";
import { AnimatedGreeting } from "@/components/animated-greeting";
import { SpotifyItem } from "@/components/spotify-item";
import { ContactForm } from "@/components/contact-form";
import { WhatsappForm } from "@/components/whatsapp-form";
import { SocialList } from "@/components/social-list";
import { ProjectsList } from "@/components/projects-list";
import { PostsList } from "@/components/posts-list";
import { Rocket, Instagram, Twitter, Linkedin, Github } from "lucide-react";

/**
 * TODO:
 * [] Edit section title, subtitle, and description.
 * [] Configure the Multi-Language.
 */

export default function Home() {
  const t = useI18n();

  return (
    <SplashWrapper>
      <main>
        <section id="hero" className="py-32 px-4">
          <div className="mx-auto container">
            <div className="flex flex-col gap-32 md:flex-row">
              <div className="w-full flex flex-col justify-between space-y-16 md:w-1/2">
                <div>
                  <h1 className="text-2xl font-light mb-16 md:text-3xl">
                    {t("hello")} 👋🏻, {t("greeting.intro")}
                    <span className="block text-6xl font-black mt-3 md:text-7xl">
                      {t("greeting.role")} <AnimatedGreeting t={t} />
                    </span>
                  </h1>
                  <blockquote className="border-l-2 pl-6 italic mb-16">
                    &quot;{t("quote.text")}{" "}
                    <Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="italic hover:underline"
                    >
                      {t("quote.highlight")}
                    </Link>
                    {t("quote.continuation")}&quot; —{" "}
                    <strong>{t("quote.author")}</strong>
                  </blockquote>
                  <div className="flex gap-4">
                    <Button
                      variant="glossy"
                      className="rounded-full"
                      size="lg"
                      asChild
                    >
                      <Navigator
                        to="contact"
                        smooth={true}
                        offset={-52}
                        duration={500}
                      >
                        <Rocket />
                        Let's talk
                      </Navigator>
                    </Button>
                    <Button
                      variant="glossy-accent"
                      className="rounded-full"
                      size="lg"
                      asChild
                    >
                      <Link
                        href="https://github.com/oortsky"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github />
                        GitHub
                      </Link>
                    </Button>
                  </div>
                </div>

                <SpotifyItem />
              </div>
              <div className="w-full md:w-1/2 text-center">
                <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg mb-4">
                  {/* <ManekiNeko /> */}
                </AspectRatio>
                <p className="text-xs text-muted-foreground text-center max-w-md w-full px-4 leading-relaxed mx-auto">
                  Credits:{" "}
                  <Link
                    href="https://skfb.ly/oEQZ6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    "Lucky cat maneki neko"
                  </Link>{" "}
                  by Rice & Soy Sauce is licensed under{" "}
                  <Link
                    href="http://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    Creative Commons Attribution
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="py-32 px-4 bg-secondary">
          <div className="mx-auto container">
            <div className="w-full flex flex-col gap-32 md:flex-row-reverse">
              <div className="w-full md:w-1/2">
                <h1 className="font-semibold">About</h1>
                <p className="text-sm font-light">
                  About my background & story (lore).
                </p>
                <Separator className="my-7 bg-background" />
                <ScrollArea className="h-96 w-full">
                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold">Introduction</h1>
                    <p>
                      Welcome to my portfolio page. My name is Bayu Aprio
                      Pamungkas with the code name OORTSKY. I am a full-stack
                      developer, I have been working in this field since 2020. I
                      am now 21 years old. I am a graduate of a technical high
                      school majoring in automotive engineering.
                    </p>

                    <h2 className="text-xl font-bold">
                      Why did I pursue this field?
                    </h2>
                    <p>
                      I pursued this field because I enjoy creative thinking and
                      practicing my problem-solving skills. I'm self-taught. I
                      learned it through YouTube, Online Courses,
                      Webinars,Google, and now through AI. There are quite a lot
                      of skills that I have learned.
                    </p>

                    <h2 className="text-xl font-bold">My current skills...</h2>
                    <TechBadges />

                    <h2 className="text-xl font-bold">Let's be a partners</h2>
                    <p>
                      Let's collaborate with it so we can develop our skills and
                      social connections.
                    </p>

                    <div className="space-x-2">
                      <Button
                        variant="glossy"
                        className="rounded-full"
                        size="icon-lg"
                        asChild
                      >
                        <Link
                          href="https://x.com/@oortsky"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter />
                        </Link>
                      </Button>
                      <Button
                        variant="glossy"
                        className="rounded-full"
                        size="icon-lg"
                        asChild
                      >
                        <Link
                          href="https://instagram.com/oortsky"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram />
                        </Link>
                      </Button>
                      <Button
                        variant="glossy"
                        className="rounded-full"
                        size="icon-lg"
                        asChild
                      >
                        <Link
                          href="https://github.com/oortsky"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github />
                        </Link>
                      </Button>
                      <Button
                        variant="glossy"
                        className="rounded-full"
                        size="icon-lg"
                        asChild
                      >
                        <Link
                          href="https://linkedin.com/in/bayuaprio"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </div>
              <div className="w-full md:w-1/2 text-center">
                <AspectRatio ratio={1 / 1} className="bg-muted rounded-lg mb-4">
                  <Image
                    src="/assets/images/oort.webp"
                    alt="Oort Cloud Image"
                    fill
                    className="rounded-lg object-cover dark:brightness-20"
                  />
                </AspectRatio>
                <p className="text-xs text-muted-foreground text-center max-w-md w-full px-4 leading-relaxed mx-auto">
                  Image: Oort Cloud via{" "}
                  <Link
                    href="https://www.google.com/search?q=oort+cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    Google
                  </Link>
                  . Edited with Adobe Lightroom.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="py-32 px-4">
          <div className="mx-auto container">
            <div className="w-full">
              <h1 className="font-semibold">Projects</h1>
              <p className="text-sm font-light">
                My latest projects that i made.
              </p>
              <Separator className="my-7" />
              <ScrollArea className="w-full">
                <ProjectsList />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </section>
        <section id="blog" className="py-32 px-4 bg-secondary">
          <div className="mx-auto container">
            <div className="w-full">
              <h1 className="font-semibold">Articles</h1>
              <p className="text-sm font-light">
                My recent articles or blog posts that i write.
              </p>
              <Separator className="my-7 bg-background" />
              <ScrollArea className="w-full">
                <PostsList />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </section>
        {/* Troll Idea - My ... (Bini) with shown image of Aya Aulia */}
        <section id="contact" className="py-32 px-4">
          <div className="mx-auto container">
            <div className="flex flex-col gap-32 md:flex-row">
              <div className="w-full md:w-1/2">
                <ContactForm />
              </div>
              <div className="w-full md:w-1/2">
                <WhatsappForm />
                <Separator className="my-7" />
                <SocialList />
              </div>
            </div>
          </div>
        </section>
      </main>
    </SplashWrapper>
  );
}
