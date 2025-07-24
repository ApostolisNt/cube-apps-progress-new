export const redRooms = [
  "DANGER_MINEFIELD",
  "RESTRICTED_AREA",
  "SPEED_BARRELS",
  "FLOOR_IS_LAVA",
  "RED_ROPES_AREA",
  "KNOCK_OUT",
  "LASER_MAZE",
  "ROAD_TO_OLYMPUS",
  "GYM_TONIC",
  "GOLDEN_GATE_BRIDGE",
  "CARDIO",
  "LOST_CITY",
  "LAVA_LAND",
  "LIGHT_FIELD",
] as const;

export const greenRooms = [
  "RAINBOW_MIND",
  "SPOT_THE_DIFFERENCES",
  "PYRAMID_OF_GIZA",
  "CLEF_DE_SOL",
  "BEAT_THE_BOMB",
  "ALL_IN",
  "GENIUS",
  "WORLDERLAND",
  "CANDIT",
] as const;

export const yellowRooms = [
  "SLINGSHOT_MADNESS",
  "SUBBUTEO",
  "BUZZER_BEATER",
  "TARGET8",
  "FILL_IT",
  "LIGHTS_ON",
  "CRYSTAL_MAZE",
  "COMET_FORCES",
  "CARGO",
  "SKEEBALL",
  "BUBBLE_TROUBLE",
  "GOLF_IT",
  "SPINNING",
  "COLOR_TWIST",
  "7_BLOCKS",
  "CRAZY_CIRCUIT",
  "SHOOTING_FARM",
  "HANGRY_MONKEY",
] as const;

export const purpleRooms = [
  "GHOST_HUNTERS",
  "MAGIC_POTION",
  "WHOS_THERE",
  "HORROR_ROUTE",
  "LAST_SENSE",
  "TIC_TAC_TOE",
] as const;

export type PhysicalRoom = (typeof redRooms)[number];
export type BrainRoom = (typeof greenRooms)[number];
export type SkillsRoom = (typeof yellowRooms)[number];
export type HorrorRoom = (typeof purpleRooms)[number];

export type AllRooms = PhysicalRoom | BrainRoom | SkillsRoom | HorrorRoom;
