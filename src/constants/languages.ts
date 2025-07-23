import fallback from "../assets/images/flags/fallback.svg";
import ae from "../assets/images/flags/ae.svg";
import ar from "../assets/images/flags/ar.svg";
import da from "../assets/images/flags/da.svg";
import de from "../assets/images/flags/de.svg";
import en from "../assets/images/flags/en.svg";
import es from "../assets/images/flags/es.svg";
import fr from "../assets/images/flags/fr.svg";
import it from "../assets/images/flags/it.svg";
import nl from "../assets/images/flags/nl.svg";
import ro from "../assets/images/flags/ro.svg";
import ru from "../assets/images/flags/ru.svg";
import sl from "../assets/images/flags/sl.svg";

export type LanguageCode = keyof typeof languages;

export function getFlag(code: LanguageCode) {
  if (!languages[code]) {
    console.error(`Language code [${code}] not found, using fallback`);
    return languages.fallback;
  }
  return languages[code];
}

const languages = {
  ae,
  ar,
  da,
  de,
  en,
  es,
  fr,
  it,
  nl,
  ro,
  ru,
  sl,

  fallback,
};
