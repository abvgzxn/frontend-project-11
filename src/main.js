import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import { initI18n, i18n } from './i18n.js';
import runApp from './application.js';
import { initView } from './view.js';

initI18n()
  .then(() => {
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
  })
  .catch((err) => console.error('Ошибка инициализации:', err));