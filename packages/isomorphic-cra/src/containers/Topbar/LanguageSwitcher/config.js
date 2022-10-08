import language from "@iso/config/language.config";

import vietnamLang from "@iso/assets/images/flag/vietnam.png";
// import englishLang from "@iso/assets/images/flag/uk.svg";
import chineseLang from "@iso/assets/images/flag/china.svg";

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "english",
      locale: "en",
      text: "English",
      icon: vietnamLang,
    },
    {
      languageId: "chinese",
      locale: "zh",
      text: "Chinese",
      icon: chineseLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach((language) => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
