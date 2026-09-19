import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationAR from "./locales/ar/translation.json";
import translationEN from "./locales/en/translation.json";

const resources = {
  ar: { translation: translationAR },
  en: { translation: translationEN },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false, // React يقوم بحماية HTML تلقائياً
    },
    react: {
      useSuspense: false, // يمنع التعليق وحصوات التحميل العشوائية
    },
  });

// دالة تحديث اتجاه Document للـ RTL/LTR
const applyLanguageDirection = (lng: string) => {
  if (typeof document !== "undefined") {
    document.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  }
};

// تطبيق الاتجاه فور بدء التشغيل
applyLanguageDirection(i18n.resolvedLanguage || i18n.language || "ar");

// تطبيق الاتجاه عند تبديل اللغة مستقبلاً
i18n.on("languageChanged", (lng) => {
  applyLanguageDirection(lng);
});

export default i18n;