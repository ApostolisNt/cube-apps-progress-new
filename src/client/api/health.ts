import { getApiClient } from "./general";
import type { HealthResponse } from "../../types/api";

export async function health(): Promise<HealthResponse> {
  const client = await getApiClient();

  const response = await client.get<HealthResponse>("/api/healthcheck");

  return response;
}
