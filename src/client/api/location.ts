import { getApiClient } from "./general";

export async function getLocation(): Promise<string> {
  const client = await getApiClient();
  const response = await client.get<string>("api/settings?key=location");
  return response;
}
