import { validateUrl } from './validator.js';
import { state } from './state.js';
import { uniqueId } from 'lodash';

export default function runApp() {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-url');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = input.value.trim();
    state.form.url = url;

    validateUrl(url)
      .then(() => loadFeed(url))
      .then((xml) => parseFeed(xml))
      .then((parsed) => {
        const feedId = uniqueId('feed_');
        const newFeed = {
          id: feedId,
          title: parsed.feed.title || 'Без названия',
          description: parsed.feed.description || '',
          postsId: [],
        };
        const newPosts = parded.posts.map((post) => ({
          id: uniqueId('post_'),
          title: post.title || 'Без заголовка',
          link: post.link || '#',
          feedId: feedId,
        }));
        state.feeds.push(newFeeed);
        state.posts.push(...newPosts);

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
      });
  });

  input.addEventListener('input', () => {
    if (state.form.errorKey) {
      state.form.errorKey = null;
    }
  });
}