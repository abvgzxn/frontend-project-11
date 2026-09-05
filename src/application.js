import { validateUrl } from './validator.js';
import { state } from './state.js';
import { loadFeed, parseFeed } from './parser.js';
import { uniqueId } from 'lodash';
import { startUpdating } from './updater.js';

export default function runApp() {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-url');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = input.value.trim();
    state.form.url = url;

    validateUrl(url)
      .then(() => {
        state.form.isValid = true;
        state.form.errorKey = null;
        return loadFeed(url);
      })
      .then((xml) => parseFeed(xml))
      .then((parsed) => {
        const feedId = uniqueId('feed_');
        const newFeed = {
          id: feedId,
          url: url,
          title: parsed.feed.title || 'Без названия',
          description: parsed.feed.description || '',
          postsIds: [],
        };
        const newPosts = parsed.posts.map((post) => ({
          id: uniqueId('post_'),
          title: post.title || 'Без заголовка',
          link: post.link || '#',
          description: post.description || '',
          feedId: feedId,
        }));

        state.feeds.push(newFeed);
        state.posts.push(...newPosts);

        if (state.feeds.length === 1) {
          startUpdating();
        }

        state.form.successMessage = 'RSS успешно загружен';

        state.form.url = '';
        state.form.isValid = false;
        state.form.errorKey = null;
        input.focus();
      })
      .catch((err) => {
        let key = 'errors.unknown';
        if (err.type === 'required') key = 'errors.required';
        else if (err.type === 'url') key = 'errors.url';
        else if (err.type === 'unique') key = 'errors.duplicate';
        else if (err.type === 'network') key = 'errors.network';
        else if (err.type === 'parsing') key = 'errors.parsing';
        state.form.isValid = false;
        state.form.errorKey = key;
        state.form.successMessage = null;
      });
  });

  input.addEventListener('input', () => {
    const url = input.value.trim();
    state.form.url = url;

    if (url === '') {
      state.form.isValid = false;
      state.form.errorKey = null;
      state.form.successMessage = null;
      return;
    }

    validateUrl(url)
      .then(() => {
        state.form.isValid = true;
        state.form.errorKey = null;
        state.form.successMessage = null;
      })
      .catch((err) => {
        state.form.isValid = false;
        let key = 'errors.unknown';
        if (err.type === 'required') key = 'errors.required';
        else if (err.type === 'url') key = 'errors.url';
        state.form.errorKey = key;
        state.form.successMessage = null;
      });
  });
}