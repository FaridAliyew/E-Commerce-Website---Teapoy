import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['az', 'en', 'ru'], // Desteklenen diller
    fallbackLng: 'az', // Eğer dil bulunamazsa bu dil kullanılır
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Çeviri dosyalarının yolu
    },
    interpolation: {
      escapeValue: false, // React otomatik olarak xss temizliği yapar
    },
  });

export default i18n;
