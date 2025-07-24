import {
  greenRooms,
  purpleRooms,
  redRooms,
  yellowRooms,
} from "../constants/rooms";

type AnimationType =
  | "animate-slide-in-left"
  | "animate-slide-in-right"
  | "animate-slide-in-bottom";
type ColorVariant = "physical" | "brain" | "skills" | "horror";

export type RoomVariation = {
  colorClass?: `text-${ColorVariant}` | "text-cube-primary";
  animationClass?: AnimationType;
};

const ROOM_VARIATIONS: Record<ColorVariant | "default", RoomVariation> = {
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

type RoomArrayType =
  | typeof redRooms
  | typeof greenRooms
  | typeof yellowRooms
  | typeof purpleRooms;

const ROOM_GROUPS: Array<{
  type: ColorVariant;
  rooms: RoomArrayType;
}> = [
  { type: "physical", rooms: redRooms },
  { type: "brain", rooms: greenRooms },
  { type: "skills", rooms: yellowRooms },
  { type: "horror", rooms: purpleRooms },
];

export const getRoomVariation = (room: string): RoomVariation => {
  const roomGroup = ROOM_GROUPS.find((group) =>
    group.rooms.includes(room as never)
  );
  return ROOM_VARIATIONS[roomGroup?.type || "default"];
};
