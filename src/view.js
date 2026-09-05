import { snapshot, subscribe } from 'valtio/vanilla';
import { state } from './state.js';
import { i18n } from './i18n.js';

const updateInputValue = (input, value) => {
  if (input?.value !== value) {
    if (input) input.value = value;
  }
};

const updateFeedback = (input, feedbackEl, errorKey) => {
  if (!feedbackEl?.classList.contains('invalid-feedback')) return;
  if (errorKey) {
    input?.classList.add('is-invalid');
    feedbackEl.textContent = i18n.t(errorKey);
  } else {
    input?.classList.remove('is-invalid');
    feedbackEl.textContent = '';
  }
};

const renderFeeds = (container, feeds) => {
  container.innerHTML = `<h3>${i18n.t('sections.feeds')}</h3>`;
  if (feeds.length === 0) return;
  const list = document.createElement('div');
  feeds.forEach(feed => {
    const el = document.createElement('div');
    el.innerHTML = `<b>${feed.title}</b><p>${feed.description}</p>`;
    list.appendChild(el);
  });
  container.appendChild(list);
};

const renderPosts = (container, posts, readPosts) => {
  container.innerHTML = `<h3>${i18n.t('sections.posts')}</h3>`;
  if (posts.length === 0) return;
  const list = document.createElement('ul');
  posts.forEach(post => {
    const li = document.createElement('li');
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '8px';

    const link = document.createElement('a');
    link.href = post.link;
    link.textContent = post.title;
    link.target = '_blank';
    const isRead = readPosts.includes(post.id);
    link.dataset.seen = isRead ? 'true' : 'false';
    link.className = isRead ? 'fw-normal' : 'fw-bold';

    const previewBtn = document.createElement('button');
    previewBtn.type = 'button';
    previewBtn.className = 'btn btn-sm btn-outline-primary';
    previewBtn.textContent = i18n.t('buttons.preview');
    previewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!readPosts.includes(post.id)) {
        readPosts.push(post.id);
      }
      openModal(post);
    });

    wrapper.append(link, previewBtn);
    li.appendChild(wrapper);
    list.appendChild(li);
  });
  container.appendChild(list);
};

const openModal = (post) => {
  const modal = document.getElementById('postModal');
  const title = document.getElementById('postModalTitle');
  const body = document.getElementById('postModalBody');
  const link = document.getElementById('postModalLink');
  if (title) title.textContent = post.title;
  if (body) body.textContent = post.description || 'Нет описания';
  if (link) link.href = post.link;
  if (modal) modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById('postModal');
  if (modal) modal.close();
};


const render = () => {
  const snap = snapshot(state);
  const input = document.getElementById('rss-url');
  const submitButton = document.querySelector('#rss-form button[type="submit"]');
  const feedbackEl = input?.nextElementSibling;
  const feedsContainer = document.querySelector('#feeds-container');
  const postsContainer = document.querySelector('#posts-container');
  const successMessageEl = document.getElementById('success-message');

  if (successMessageEl) {
    if (snap.form.successMessage) {
      successMessageEl.textContent = snap.form.successMessage;
      successMessageEl.style.display = 'block';
    } else {
      successMessageEl.style.display = 'none';
    }
  }
  
  updateInputValue(input, snap.form.url);
  updateFeedback(input, feedbackEl, snap.form.errorKey);

  if (submitButton) {
    submitButton.disabled = !snap.form.isValid;
    if (submitButton.textContent !== i18n.t('form.submit')) {
      submitButton.textContent = i18n.t('form.submit');
    }
  }

  const label = document.querySelector('label[for="rss-url"]');
  if (label) label.textContent = i18n.t('form.label');

  const placeholderAttr = input?.getAttribute('placeholder');
  if (input && placeholderAttr !== i18n.t('form.placeholder')) {
    input.setAttribute('placeholder', i18n.t('form.placeholder'));
  }

  renderFeeds(feedsContainer, snap.feeds);
  renderPosts(postsContainer, snap.posts, snap.readPosts);
};


export const initView = () => {
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const modal = document.getElementById('postModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  render();
  subscribe(state, render);
};