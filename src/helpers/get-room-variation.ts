import { greenRooms, purpleRooms, redRooms, yellowRooms } from "../constants/rooms";
import type { RoomColorVariant } from "../types/common";
import type { RoomVariation } from "../types/rooms";

const ROOM_VARIATIONS: Record<RoomColorVariant | "default", RoomVariation> = {
  physical: {
    colorClass: "text-physical",
    animationClass: "animate-slide-in-left",
  },
  brain: {
    colorClass: "text-brain",
    animationClass: "animate-slide-in-left",
  },
  skills: {
    colorClass: "text-skills",
    animationClass: "animate-slide-in-right",
  },
  horror: {
    colorClass: "text-horror",
    animationClass: "animate-slide-in-right",
  },
  default: {
    colorClass: "text-cube-primary",
    animationClass: "animate-slide-in-bottom",
  },
};

type RoomArrayType = typeof redRooms | typeof greenRooms | typeof yellowRooms | typeof purpleRooms;

const ROOM_GROUPS: Array<{
  type: RoomColorVariant;
  rooms: RoomArrayType;
}> = [
  { type: "physical", rooms: redRooms },
  { type: "brain", rooms: greenRooms },
  { type: "skills", rooms: yellowRooms },
  { type: "horror", rooms: purpleRooms },
];

export const getRoomVariation = (room: string): RoomVariation => {
  const roomGroup = ROOM_GROUPS.find((group) => group.rooms.includes(room as never));
  return ROOM_VARIATIONS[roomGroup?.type || "default"];
};
