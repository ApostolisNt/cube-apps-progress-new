import type { LanguageCode } from "../../constants/languages";
import { getApiClient } from "./general";

export async function getLanguages(): Promise<LanguageCode> {
  const client = await getApiClient();

  const response = await client.get<LanguageCode>("api/settings?key=languages");

  return response;
}

export async function getDefaultLanguage(): Promise<LanguageCode> {
  const client = await getApiClient();

  const response = await client.get<LanguageCode>("api/settings?key=default_language");

  return response;
}
