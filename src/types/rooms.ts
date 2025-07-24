import type { TeamProgress, SingleRoom } from "./api";
import type { AnimationType, RoomColorVariant } from "./common";
export type {
  PhysicalRoom,
  BrainRoom,
  SkillsRoom,
  HorrorRoom,
  AllRooms,
} from "../constants/rooms";

export type Rooms = Pick<TeamProgress, "rooms">["rooms"] | undefined;

export type RoomVariationType = {
  type: RoomColorVariant;
  rooms: readonly string[];
};

export type CategorizedRooms = {
  physical: SingleRoom[];
  brain: SingleRoom[];
  skills: SingleRoom[];
  horror: SingleRoom[];
};

export type RoomVariation = {
  colorClass?: `text-${RoomColorVariant}` | "text-cube-primary";
  animationClass?: AnimationType;
};
