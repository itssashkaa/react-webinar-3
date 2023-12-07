import ruLocale from "./ru.json";
import enLocale from "./en.json";

function loadLocale(locale = "ru") {
  const locales = {
    en: enLocale,
    ru: ruLocale,
  };
  const localeData = locales[locale];
  return localeData;
}

export default loadLocale;
