// Translation files
import en from "../locales/en.json";
import de from "../locales/de.json";
import es from "../locales/es.json";
import fr from "../locales/fr.json";
import it from "../locales/it.json";
import nl from "../locales/nl.json";
import ru from "../locales/ru.json";
import ro from "../locales/ro.json";
import sl from "../locales/sl.json";
import da from "../locales/da.json";
import ar from "../locales/ar.json";
import ae from "../locales/ae.json";
import type { LanguageCode } from "../constants/languages";

// Define the translations type based on the English translations
export type TranslationKeys = typeof en;

// Translation map
const translations: Record<LanguageCode, TranslationKeys> = {
  en,
  de,
  es,
  fr,
  it,
  nl,
  ru,
  ro,
  sl,
  da,
  ar,
  ae,
  fallback: en,
};

/**
 * Get nested value from object using dot notation
 * e.g., get(obj, 'nested.key') returns obj.nested.key
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  return path.split(".").reduce((current: unknown, key) => {
    return current && typeof current === "object"
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj) as string | undefined;
}

/**
 * Replace placeholders in translation strings
 * e.g., "Hello {{name}}" with { name: "John" } becomes "Hello John"
 */
function interpolate(text: string, params: Record<string, string | number> = {}): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
}

/**
 * Get translation for a specific key and language
 * @param language - The language code
 * @param key - The translation key
 * @param params - Parameters for interpolation
 * @returns The translated string
 */

export function getTranslation(
  language: LanguageCode | undefined,
  key: string,
  params: Record<string, string | number> = {}
): string {
  // Fallback to English if language is not defined or not supported
  const lang = language && translations[language] ? language : "en";
  const translation = getNestedValue(translations[lang], key);

  if (!translation) {
    console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    const fallback = getNestedValue(translations.en, key);
    return fallback ? interpolate(fallback, params) : key;
  }

  return interpolate(translation, params);
}
