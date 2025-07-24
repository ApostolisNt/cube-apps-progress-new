import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { VIEWS } from "../constants/general";
import type { LanguageCode } from "../constants/languages";
import type { TeamProgress } from "../client/api/progress";

export type Views = (typeof VIEWS)[keyof typeof VIEWS];

type AppContextType = {
  currentView: Views;
  setCurrentView: Dispatch<SetStateAction<Views>>;
  currentLanguage: LanguageCode | undefined;
  setCurrentLanguage: Dispatch<SetStateAction<LanguageCode | undefined>>;
  teamName: string | null;
  setTeamName: Dispatch<SetStateAction<string | null>>;
  location: string; // Create location enum
  setLocation: Dispatch<SetStateAction<string>>;
  teamData: TeamProgress | undefined;
  setTeamData: Dispatch<SetStateAction<TeamProgress | undefined>>;
  resetToIdle: () => void;
  timezone: string;
  setTimezone: Dispatch<SetStateAction<string>>;
  gameMode: "arena" | "arcade";
  setGameMode: Dispatch<SetStateAction<"arena" | "arcade">>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [currentView, setCurrentView] = useState<Views>(VIEWS.IDLE);
  const [currentLanguage, setCurrentLanguage] = useState<
    LanguageCode | undefined
  >(undefined);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [teamData, setTeamData] = useState<TeamProgress | undefined>(undefined);
  const [timezone, setTimezone] = useState<string>("");
  const [gameMode, setGameMode] = useState<"arena" | "arcade">("arena");

  const resetToIdle = () => {
    setCurrentView(VIEWS.IDLE);
    setTeamName(null);
    setTeamData(undefined);
  };

  const value: AppContextType = {
    currentView,
    setCurrentView,
    currentLanguage,
    setCurrentLanguage,
    teamName,
    setTeamName,
    location,
    setLocation,
    teamData,
    setTeamData,
    resetToIdle,
    timezone,
    setTimezone,
    gameMode,
    setGameMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
