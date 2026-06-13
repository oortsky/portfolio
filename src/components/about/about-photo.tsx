import { m } from "@/paraglide/messages.js";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AboutPhoto() {
  return (
    <figure>
      <AspectRatio
        ratio={1}
        className="relative overflow-hidden rounded-xl bg-muted/10"
      >
        <img
          src="/assets/images/profile.webp"
          alt="Oort Cloud Image"
          className="h-full w-full object-cover dark:brightness-20"
        />
      </AspectRatio>

      <figcaption className="mx-auto max-w-md text-center">
        <span className="text-xs leading-relaxed text-muted-foreground">
          {m["about_photo.image"]()}: Oort Cloud {m["about_photo.via"]()}{" "}
          <a
            href="https://www.google.com/search?q=oort+cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Google
          </a>
          . {m["about_photo.edited_with"]()} Adobe Lightroom.
        </span>
      </figcaption>
    </figure>
  );
}
