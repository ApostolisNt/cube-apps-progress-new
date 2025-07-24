import { getApiClient } from "./general";

export async function getLocation(): Promise<string> {
  const client = await getApiClient();
  const response = await client.get<string>("api/settings?key=location");
  return response;
}

export async function getTimezone(): Promise<string> {
  const client = await getApiClient();
  const response = await client.get<string>("api/settings?key=timezone");
  return response;
}

export async function getGameMode(): Promise<"arena" | "arcade"> {
  const client = await getApiClient();
  const response = await client.get<"arena" | "arcade">("api/settings?key=gameMode");
  return response;
}

export async function getCustomRoomNames(location: string): Promise<string> {
  const client = await getApiClient();
  const response = await client.get<string>(
    `api/settings/rooms/customRoomNames.php?location=${location}`
  );
  return response;
}
