import { createContext, useContext, type ReactNode } from "react";
import type { LanguageCode } from "../constants/languages";
import { getTranslation } from "../services/localization";


type LocalizationContextType = {
  currentLanguage: LanguageCode | undefined;
  t: (key: string, params?: Record<string, string | number>) => string;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
}

type LocalizationProviderProps = {
  children: ReactNode;
  language: LanguageCode | undefined;
};

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
