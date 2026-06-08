import { validateUrl } from './validator.js';
import { state } from '.state.js';

export default function runApp() {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-url');
  const submitButton = document.querySelector('button[type="submit"]');

  form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const url = input.value.trim();

    state.form.url = url;

    validateUrl(url)
    .then(() => {
    state.form.isValid = true;
    state.form.error = null;
    state.feeds.push({ url: state.form.url })
    state.form.url = ''
  })
  .catch((err) => {
    state.form.isValid = false;
    state.form.error = err.message;
  });
  });

  input.addEventListener('input', () =>{
    if (state.form.error) {
      state.form.error = null;
    }
  });
}