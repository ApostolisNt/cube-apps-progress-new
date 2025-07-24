import { getApiClient } from "./general";
import type { ReadTeamProgressRequest, TeamProgress } from "../../types";

export async function getTeam(request: ReadTeamProgressRequest): Promise<TeamProgress> {
  const client = await getApiClient();

  const formData = new FormData();
  formData.append("user_id", request.userId);

  const response = await client.postFormData<TeamProgress>("api/team/fetchProgress.php", formData);

  return response;
}
