export type ReactChildrenProps = {
  children: React.ReactNode;
};

export type GameMode = "arena" | "arcade";

export type AnimationType =
  | "animate-slide-in-left"
  | "animate-slide-in-right"
  | "animate-slide-in-bottom";

export type RoomColorVariant = "physical" | "brain" | "skills" | "horror";

export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
