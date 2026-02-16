import Image from "next/image";
import Link from "next/link";
import { useLanyard } from "@/hooks/use-lanyard";

import { FieldLegend, FieldSet } from "@/components/ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemActions
} from "@/components/ui/item";
import { Disc } from "lucide-react";

/**
 * TODO:
 * [] Adding BG with wave animation.
 */

export function SpotifyItem() {
  const { data } = useLanyard();

  if (!data?.listening_to_spotify || data?.spotify === null) {
    return null;
  }

  const spotify = data.spotify;

  return (
    <FieldSet>
      <FieldLegend>Now, I'm listening to the song...</FieldLegend>
      <Item variant="outline" asChild>
        <Link
          href={`https://open.spotify.com/track/${spotify?.track_id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ItemMedia variant="image">
            <Image
              src={spotify?.album_art_url}
              alt={spotify?.song}
              width={32}
              height={32}
              className="object-cover"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">
              {spotify?.song} -{" "}
              <span className="text-muted-foreground">{spotify?.album}</span>
            </ItemTitle>
            <ItemDescription>{spotify?.artist}</ItemDescription>
            <ItemActions>
              <Disc className="size-4 transition-all duration-500 animate-spin" />
            </ItemActions>
          </ItemContent>
        </Link>
      </Item>
    </FieldSet>
  );
}
