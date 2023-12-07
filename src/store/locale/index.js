import loadLocale from "../../assets/locales/locales";
import StoreModule from "../module";

class Locale extends StoreModule {
  initState() {
    return {
      lang: "ru",
      localeData: loadLocale('ru')
    };
  }

  setLocale(locale) {
    this.setState(
      {
        ...this.getState(),
        lang: locale,
        localeData: loadLocale(locale)
      },
    );
  }
}

export default Locale;
