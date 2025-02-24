import { i18n } from "i18next";

const setLanguage = (i18n: i18n, lang: string) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
}

export default setLanguage;