import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LanguageKey } from "@/language";
import English from "@/language/resource/en.json";
import Vietnamese from "@/language/resource/vi.json";

const languageResources = {
  [LanguageKey.en]: { translation: English },
  [LanguageKey.vi]: { translation: Vietnamese }
};
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: languageResources,
    fallbackLng: LanguageKey.en,
    debug: true,
    interpolation: {
      escapeValue: false
    },
    ns: ["translation"],
    defaultNS: "translation",
    lng: LanguageKey.en,
  });

export default i18n;
