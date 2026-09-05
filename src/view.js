import { snapshot, subscribe } from 'valtio/vanilla';
import { state } from './state.js';
import { i18n } from './i18n.js';

const render = () => {
  const snap = snapshot(state);
  const input = document.getElementById('rss-url');
  const submitButton = document.querySelector('#rss-form button[type="submit"]');
  const feedbackEl = input?.nextElementSibling;
  const feedsContainer = document.querySelector('#feeds-container');
  const postsContainer = document.querySelector('#posts-container');

  if (input?.value !== snap.form.url) {
    if (input) input.value = snap.form.url;
  }


  if (feedbackEl?.classList.contains('invalid-feedback')) {
    if (snap.form.errorKey) {
      input?.classList.add('is-invalid');
      feedbackEl.textContent = i18n.t(snap.form.errorKey);
    } else {
      input?.classList.remove('is-invalid');
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

  if (submitButton?.textContent !== i18n.t('form.submit')) {
    if (submitButton) submitButton.textContent = i18n.t('form.submit');
  }

  feedsContainer.innerHTML = '';
  feedsContainer.innerHTML = `<h3>${i18n.t('sections.feeds')}</h3>`;
  if (snap.feeds.length > 0) {
    const feedList = document.createElement('div');
    snap.feeds.forEach(feed => {
      const feedEl = document.createElement('div');
      feedEl.innerHTML = `<b>${feed.title}</b><p>${feed.description}</p>`;
      feedList.appendChild(feedEl);
    });
    feedsContainer.appendChild(feedList);
  }

  postsContainer.innerHTML = '';
  postsContainer.innerHTML = `<h3>${i18n.t('sections.posts')}</h3>`;
  if (snap.posts.length > 0) {
    const postList = document.createElement('ul');
    snap.posts.forEach(post => {
      const li = document.createElement('li');
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.gap = '8px';

      const a = document.createElement('a');
      a.href = post.link;
      a.textContent = post.title;
      a.target = '_blank';
      const isRead = snap.readPosts.includes(post.id);
      a.dataset.seen = isRead ? 'true' : 'false';
      a.className = isRead ? 'fw-normal' : 'fw-bold';

      const previewBtn = document.createElement('button');
      previewBtn.type = 'button';
      previewBtn.className = 'btn btn-sm btn-outline-primary';
      previewBtn.textContent = i18n.t('buttons.preview');

      previewBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!state.readPosts.includes(post.id)) {
          state.readPosts.push(post.id);
        }

        const modal = document.getElementById('postModal');
        const modalTitle = document.getElementById('postModalTitle');
        const modalBody = document.getElementById('postModalBody');
        const modalLink = document.getElementById('postModalLink');

        if (modalTitle) modalTitle.textContent = post.title;
        if (modalBody) modalBody.textContent = post.description || 'Нет описания';
        if (modalLink) modalLink.href = post.link;
        if (modal) modal.showModal();
      });

      container.append(a, previewBtn);
      li.appendChild(container);
      postList.appendChild(li);
    });
    postsContainer.appendChild(postList);
  }
};

export const initView = () => {
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      const modal = document.getElementById('postModal');
      if (modal) modal.close();
    });
  }

  const modal = document.getElementById('postModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  }

  render();
  subscribe(state, render);
};