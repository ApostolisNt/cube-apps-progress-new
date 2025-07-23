import { getApiClient } from "./general";

export type HealthResponse = {
  roomsQueryTimeMs: number;
  version: string;
};

export async function health(): Promise<HealthResponse> {
  const client = await getApiClient();

  const response = await client.get<HealthResponse>("/api/healthcheck");

  return response;
}
