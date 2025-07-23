import type { TeamProgress } from "../client/api/progress";
import {
  greenRooms,
  purpleRooms,
  redRooms,
  yellowRooms,
} from "../constants/rooms";

type Rooms = Pick<TeamProgress, "rooms">["rooms"] | undefined;

export const roomsListsToShow = (rooms: Rooms) => {
  if (!rooms) return [];

  const red = rooms.filter(({ room_name }) => redRooms.includes(room_name));
  const green = rooms.filter(({ room_name }) => greenRooms.includes(room_name));
  const yellow = rooms.filter(({ room_name }) =>
    yellowRooms.includes(room_name)
  );
  const purple = rooms.filter(({ room_name }) =>
    purpleRooms.includes(room_name)
  );

  return [...red, ...green, ...yellow, ...purple];
};
