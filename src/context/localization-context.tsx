import { createContext, useContext } from "react";
import { getTranslation } from "../services/localization";
import type { LocalizationContextType, LocalizationProviderProps } from "../types";

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}

export function LocalizationProvider({ children, language }: LocalizationProviderProps) {
  const t = (key: string, params?: Record<string, string | number>) => {
    return getTranslation(language, key, params);
  };

  const value: LocalizationContextType = {
    currentLanguage: language,
    t,
  };

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}
