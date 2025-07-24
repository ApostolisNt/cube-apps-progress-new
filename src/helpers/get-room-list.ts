import type { TeamProgress } from "../client/api/progress";
import {
  greenRooms,
  purpleRooms,
  redRooms,
  yellowRooms,
  type BrainRoom,
  type HorrorRoom,
  type PhysicalRoom,
  type SkillsRoom,
} from "../constants/rooms";

export type Rooms = Pick<TeamProgress, "rooms">["rooms"] | undefined;

export const roomsListsToShow = (rooms: Rooms) => {
  if (!rooms) return [];

  const red = rooms.filter(({ room_name }) =>
    redRooms.includes(room_name as PhysicalRoom)
  );
  const green = rooms.filter(({ room_name }) =>
    greenRooms.includes(room_name as BrainRoom)
  );
  const yellow = rooms.filter(({ room_name }) =>
    yellowRooms.includes(room_name as SkillsRoom)
  );
  const purple = rooms.filter(({ room_name }) =>
    purpleRooms.includes(room_name as HorrorRoom)
  );

  return [...red, ...green, ...yellow, ...purple];
};
