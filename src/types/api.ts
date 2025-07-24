export type HealthResponse = {
  roomsQueryTimeMs: number;
  version: string;
};

export type SingleRoom = {
  room_name: string;
  tries: number;
  difficulty: string;
  score: number;
};

export type TeamMember = {
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
};

export type Team = {
  dateofplay: string;
  score: string;
  team_name: string;
  time_left: number;
  timeofactivation: string;
  timetoplay: string;
};

export type TeamProgress = {
  team: Team;
  users: Array<TeamMember>;
  rooms: Array<SingleRoom>;
};

export type ReadTeamProgressRequest = {
  userId: string;
};

export type CustomRoomName = {
  room_name: string;
  custom_name: string;
};

export type CustomRoomNamesResponse = Array<CustomRoomName>;
