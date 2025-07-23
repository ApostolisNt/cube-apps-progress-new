import { getApiClient } from "./general";

type ReadTeamProgressRequest = {
  userId: string;
};

export type TeamProgress = {
  team: {
    dateofplay: string;
    score: string;
    team_name: string;
    time_left: number;
    timeofactivation: string;
    timetoplay: string;
  };
  users: Array<{
    id: string;
    team_id: string;
    user_id: string;
    user_status: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    picture: string;
    dateofbirth: null;
  }>;
  rooms: Array<{
    room_name: string;
    tries: number;
    difficulty: string;
    score: number;
  }>;
};

export async function getTeam(
  request: ReadTeamProgressRequest
): Promise<TeamProgress> {
  const client = await getApiClient();

  const formData = new FormData();
  formData.append("user_id", request.userId);

  const response = await client.postFormData<TeamProgress>(
    "api/team/fetchProgress.php",
    formData
  );

  return response;
}
