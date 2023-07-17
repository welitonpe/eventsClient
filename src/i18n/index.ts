import en_US from "./en_US";
import pt_BR from "./pt_BR";

export const languages = {
  "en-US": en_US,
  "pt-BR": pt_BR,
};

export function translate(
  text: string,
  language: string = import.meta.env.VITE_LOCALE || window.navigator.language
) {
  const languageProperties = (languages as any)[language];

  return languageProperties[text] || text;
}

const i18n = {
  translate,
};

export default i18n;
