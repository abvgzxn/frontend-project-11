import { validateUrl } from './validator.js';
import { state } from './state.js';

export default function runApp() {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-url');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = input.value.trim();
    state.form.url = url;

    validateUrl(url)
      .then(() => {
        // Успех
        state.form.isValid = true;
        state.form.errorKey = null;
        state.feeds.push({ url });
        state.form.url = '';
      })
      .catch((err) => {
        let key = 'errors.unknown';
        if (err.type === 'required') key = 'errors.required';
        else if (err.type === 'url') key = 'errors.url';
        else if (err.type === 'unique') key = 'errors.duplicate';
        state.form.isValid = false;
        state.form.errorKey = key;
      });
  });

  input.addEventListener('input', () => {
    if (state.form.errorKey) {
      state.form.errorKey = null;
    }
  });
}