import type { Dispatch, SetStateAction } from "react";
import type { ReactChildrenProps, GameMode } from "./common";
import type { TeamProgress } from "./api";
import type { LanguageCode } from "../constants/languages";
import type { VIEWS } from "../constants/general";

// Context types
export type Views = (typeof VIEWS)[keyof typeof VIEWS];

// App Context
export type AppContextType = {
  currentView: Views;
  setCurrentView: Dispatch<SetStateAction<Views>>;
  currentLanguage: LanguageCode | undefined;
  setCurrentLanguage: Dispatch<SetStateAction<LanguageCode | undefined>>;
  teamName: string | null;
  setTeamName: Dispatch<SetStateAction<string | null>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  teamData: TeamProgress | undefined;
  setTeamData: Dispatch<SetStateAction<TeamProgress | undefined>>;
  resetToIdle: () => void;
  timezone: string;
  setTimezone: Dispatch<SetStateAction<string>>;
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
};

export type AppProviderProps = ReactChildrenProps;

export type LocalizationContextType = {
  currentLanguage: LanguageCode | undefined;
  t: (key: string, params?: Record<string, string | number>) => string;
};

export type LocalizationProviderProps = ReactChildrenProps & {
  language: LanguageCode | undefined;
};
