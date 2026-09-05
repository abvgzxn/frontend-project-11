import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { initI18n, i18n } from './i18n.js';
import runApp from './application.js';
import { initView } from './view.js';

try {
  await initI18n();
  yup.setLocale({
    mixed: {
      required: () => i18n.t('errors.required'),
    },
    string: {
      url: () => i18n.t('errors.url'),
    },
  });
  runApp();
  initView();
} catch (err) {
  console.error('Ошибка инициализации i18n:', err);
}