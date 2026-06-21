import { state } from './state.js';
import { loadFeed, parseFeed } from './parser.js';
import { uniqueId } from 'lodash';

let isUpdating = false;

export const startUpdating = () => {
  if (isUpdating) return;
  isUpdating = true;
  scheduleUpdate();
};

const scheduleUpdate = () => {
  setTimeout(() => {
    updateAllFeeds()
      .catch(() => {}) 
      .finally(() => {
        scheduleUpdate();
      });
  }, 5000);
};

const updateAllFeeds = () => {
  const feeds = state.feeds;
  if (feeds.length === 0) return Promise.resolve();

  const fetchPromises = feeds.map(feed => {
    return loadFeed(feed.url)
      .then(xml => parseFeed(xml))
      .then(parsed => {
        const existingLinks = new Set(state.posts.map(p => p.link));
        const newPosts = parsed.posts.filter(post => !existingLinks.has(post.link));
        if (newPosts.length > 0) {
          newPosts.forEach(post => {
            state.posts.push({
              id: uniqueId('post_'),
              title: post.title,
              link: post.link,
              feedId: feed.id,
            });
          });
        }
      })
      .catch(err => {
        console.warn(`Ошибка при обновлении фида ${feed.id}:`, err);
      });
  });
  return Promise.allSettled(fetchPromises);
};