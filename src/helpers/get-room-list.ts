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
import type { Rooms } from "../types";

export const roomsListsToShow = (rooms: Rooms) => {
  if (!rooms) return [];

  const physical = rooms.filter(({ room_name }) => redRooms.includes(room_name as PhysicalRoom));
  const brain = rooms.filter(({ room_name }) => greenRooms.includes(room_name as BrainRoom));
  const skills = rooms.filter(({ room_name }) => yellowRooms.includes(room_name as SkillsRoom));
  const horror = rooms.filter(({ room_name }) => purpleRooms.includes(room_name as HorrorRoom));

  return [...physical, ...brain, ...skills, ...horror];
};
