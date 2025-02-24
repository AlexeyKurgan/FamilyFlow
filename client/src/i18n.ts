import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "FamilyFlow": "FamilyFlow: Your Family Task & Activity Hub",
            "Description1": "A platform to manage family tasks, track kids' progress, and connect through shared activities, resources, and more.",
            "GetStarted": "Get Started",
            "FreeForever": "Free forever — no credit card required.",
            "CreativeTitle": "Organize, Track, and Connect",
            "Description2": "Create tasks, share resources like videos and lessons, and stay connected with your family in one unified space.",
            "HOME": "HOME",
            "About Us": "AboutUs",
            "Login": "Login",
            "SignUp": "Sign Up",
        },
    },
    ua: {
        translation: {
            "FamilyFlow": "FamilyFlow: Ваш сімейний центр завдань і активностей",
            "Description1": "Платформа для керування сімейними задачами, відстеження прогресу дітей та об’єднання через спільні активності й ресурси.",
            "GetStarted": "Розпочати",
            "FreeForever": "Безкоштовно назавжди — кредитна картка не потрібна.",
            "CreativeTitle": "Організуйте, відстежуйте та залишайтесь на зв’язку",
            "Description2": "Створюйте задачі, діліться ресурсами, такими як відео та уроки, і підтримуйте зв’язок із сім’єю в одному просторі.",
            "HOME": "Головна",
            "About Us": "Про нас",
            "Login": "Логін",
            "SignUp": "Зареєструватися",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem("language") || "en",
        interpolation: { escapeValue: false },
    });

export default i18n;