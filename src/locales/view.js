import { snapshot } from 'valtio/vanilla';
import { state, subscribeToState } from './state.js';


const render = () => {
  const snap = snapshot(state);
  const input= document.getElementById('rss-url');
  const submitButton = document.querySelector('#rss-form button[type="submit"]');
  const feedbackEl = input?.nextElementSibling;

  if (input && feedbackEl?.classList.contains('invalid-feedback')) {
    if (snap.form.error) {
      input.classList.add('is-invalid');
      feedbackEl.textContent = snap.from.error;
    } else {
      input.classList.remove('is-invalid');
      feedbackEl.textContent = '';
    }
  }

  if (submitButton) {
    submitButton.disabled = !snap.form.isValid;
  }
}

export const initView = () => {
  render();
  subscribeToState(render);
};