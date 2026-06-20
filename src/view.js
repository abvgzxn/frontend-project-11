import { snapshot, subscribe } from 'valtio/vanilla';
import { state } from './state.js';
import { i18n } from './i18n.js';

const render = () => {
  const snap = snapshot(state);
  const input = document.getElementById('rss-url');
  const submitButton = document.querySelector('#rss-form button[type="submit"]'); // переименовано в submitButton
  const feedbackEl = input?.nextElementSibling;
  const feedsContainer = document.querySelector('#feeds-container');
  const postsContainer = document.querySelector('#posts-container');

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

  if (submitButton) {
    submitButton.disabled = !snap.form.isValid;
  }

  const label = document.querySelector('label[for="rss-url"]');
  if (label) label.textContent = i18n.t('form.label');
  const placeholderAttr = input?.getAttribute('placeholder');
  if (input && placeholderAttr !== i18n.t('form.placeholder')) {
    input.setAttribute('placeholder', i18n.t('form.placeholder'));
  }
  if (submitButton && submitButton.textContent !== i18n.t('form.submit')) {
    submitButton.textContent = i18n.t('form.submit');
  }

  feedsContainer.innerHTML = '';
  postsContainer.innerHTML = '';
  feedsContainer.innerHTML = `<h3>${i18n.t('sections.feeds')}</h3>`;
  postsContainer.innerHTML = `<h3>${i18n.t('sections.posts')}</h3>`;

  if (snap.feeds.length > 0) {
    const feedList = document.createElement('div');
    snap.feeds.forEach(feed => {
      const feedEl = document.createElement('div');
      feedEl.innerHTML = `<b>${feed.title}</b><p>${feed.description}</p>`;
      feedList.appendChild(feedEl);
    });
    feedsContainer.appendChild(feedList);
  }

  if (snap.posts.length > 0) {
    const postList = document.createElement('ul');
    snap.posts.forEach(post => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = post.link;
      a.textContent = post.title;
      a.target = '_blank';
      li.appendChild(a);
      postList.appendChild(li);
    });
    postsContainer.appendChild(postList);
  }
};

export const initView = () => {
  render();
  subscribe(state, render);
};