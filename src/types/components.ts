import type { SingleRoom } from "./api";
import type { InputChangeHandler } from "./common";
import type { RoomVariation } from "./rooms";

export type BraceletInputProps = {
  braceletCode: string;
  handleBraceletChange: InputChangeHandler;
};

export type RoomProps = {
  color: RoomVariation["colorClass"];
  name: string;
  tries: number;
  score: number;
  difficulty: string;
  customName?: string;
  animation: RoomVariation["animationClass"];
};

export type RoomListProps = {
  rooms: Array<SingleRoom> | undefined;
};

export type UserPictureProps = {
  picture: string;
};

export type CubeBackgroundVideoProps = {
  src: string;
};
