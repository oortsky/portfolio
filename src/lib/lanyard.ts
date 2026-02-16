export interface LanyardResponse {
  success: boolean;
  data: {
    kv: Record<string, string>;
    discord_user: {
      id: string;
      username: string;
      avatar: string;
      avatar_decoration_data: any;
      discriminator: string;
      bot: boolean;
      global_name: string;
      display_name: string;
      display_name_styles: any;
      public_flags: number;
      collectibles: any;
      primary_guild: {
        identity_enabled: boolean;
        identity_guild_id: string;
        tag: string;
        badge: string;
      } | null;
    };
    activities: Array<{
      id: string;
      name: string;
      type: number;
      state?: string;
      details?: string;
      timestamps?: {
        start?: number;
        end?: number;
      };
      assets?: {
        large_image?: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
      };
    }>;
    discord_status: "online" | "idle" | "dnd" | "offline";
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_embedded: boolean;
    listening_to_spotify: boolean;
    spotify: SpotifyData | null;
  };
}

export interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

const DISCORD_ID = "1026731345499652096";
export const LANYARD_API = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;

export async function fetchLanyardData(): Promise<LanyardResponse> {
  const res = await fetch(LANYARD_API, {
    next: { revalidate: 60 }
  } as RequestInit);

  if (!res.ok) {
    throw new Error("Failed to fetch Discord status");
  }

  return res.json();
}

export async function getDiscordStatus(): Promise<LanyardResponse> {
  return fetchLanyardData();
}

export function useLanyardAPI() {
  return LANYARD_API;
}