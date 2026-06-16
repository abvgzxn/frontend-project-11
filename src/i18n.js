import i18next from 'i18next';
import resources from './locales/index.js';

const i18n = i18next.createInstance();
export const initI18n = () => {
  return i18n.init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false }
  });
};