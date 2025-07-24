import { createContext, useContext, useState } from "react";
import { VIEWS } from "../constants/general";
import type { LanguageCode } from "../constants/languages";
import type { AppContextType, AppProviderProps, Views, GameMode, TeamProgress } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}

export function AppProvider({ children }: AppProviderProps) {
  const [currentView, setCurrentView] = useState<Views>(VIEWS.IDLE);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode | undefined>(undefined);
  const [teamName, setTeamName] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [teamData, setTeamData] = useState<TeamProgress | undefined>(undefined);
  const [timezone, setTimezone] = useState<string>("");
  const [gameMode, setGameMode] = useState<GameMode>("arena");

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
