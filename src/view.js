import { snapshot, subscribe } from 'valtio/vanilla';
import { state } from './state.js';
import { i18n } from './i18n.js';


const render = () => {
  const snap = snapshot(state);
  const input= document.getElementById('rss-url');
  const submitButton = document.querySelector('#rss-form button[type="submit"]');
  const feedbackEl = input?.nextElementSibling;

if (input && input.value !== snap.form.url) {
    input.value = snap.form.url;
  }

   if (feedbackEl && feedbackEl.classList.contains('invalid-feedback')) {
    if (snap.form.errorKey) {
      input.classList.add('is-invalid');
      feedbackEl.textContent = i18n.t(snap.form.errorKey);
    } else {
      input.classList.remove('is-invalid');
      feedbackEl.textContent = '';
    }
  }

   if (submitBtn) {
    submitBtn.disabled = !snap.form.isValid;
  }

 const label = document.querySelector('label[for="rss-url"]');
  if (label) label.textContent = i18n.t('form.label');
  const placeholderAttr = input?.getAttribute('placeholder');
  if (input && placeholderAttr !== i18n.t('form.placeholder')) {
    input.setAttribute('placeholder', i18n.t('form.placeholder'));
  }
  if (submitBtn && submitBtn.textContent !== i18n.t('form.submit')) {
    submitBtn.textContent = i18n.t('form.submit');
  }
};

export const initView = () => {
  render();
  subscribe(state, render);
};