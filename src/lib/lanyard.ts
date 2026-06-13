export interface LanyardResponse {
  success: boolean;
  data: {
    discord_status: "online" | "idle" | "dnd" | "offline";
    discord_user: {
      id: string;
      username: string;
      avatar: string;
    };
  };
}

const DISCORD_ID = "1026731345499652096";

export async function fetchLanyardData(): Promise<LanyardResponse> {
  const response = await fetch(
    `https://api.lanyard.rest/v1/users/${DISCORD_ID}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Lanyard");
  }

  return response.json();
}