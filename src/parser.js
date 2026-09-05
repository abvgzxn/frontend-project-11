import axios from 'axios';

const loadFeed = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios.get(proxyUrl)
    .then(response => {
      if (response.status !== 200 || !response.data?.contents) {
        throw { type: 'network' }; 
      }
      return response.data.contents;
    })
    .catch(() => {
      throw { type: 'network' }; 
    });
};

const parseFeed = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  if (doc.querySelector('parsererror')) {
    throw { type: 'parsing' }; 
  }

  const channel = doc.querySelector('channel');
  if (!channel) {
    throw { type: 'parsing' };
  }

  const title = channel.querySelector('title')?.textContent || '';
  const description = channel.querySelector('description')?.textContent || '';

  const items = channel.querySelectorAll('item');
  if (items.length === 0) {
    throw { type: 'parsing' };
  }

  const posts = Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
  }));

  return { feed: { title, description }, posts };
};

export { loadFeed, parseFeed }