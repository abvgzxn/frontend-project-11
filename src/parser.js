import axios from 'axios';

const loadFeed = (url) => {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

  return axios.get(proxyUrl)
    .then(response => {
      if (response.status !== 200 || !response.data?.contents) {
        const err = new Error('Network error');
        err.type = 'network';
        throw err;
      }
      return response.data.contents;
    })
    .catch(() => {
      const err = new Error('Network error');
      err.type = 'network';
      throw err;
    });
};

const parseFeed = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');

  if (doc.querySelector('parsererror')) {
    const err = new Error('Parsing error');
    err.type = 'parsing';
    throw err;
  }

  const channel = doc.querySelector('channel');
  if (!channel) {
    const err = new Error('Parsing error');
    err.type = 'parsing';
    throw err;
  }

  const title = channel.querySelector('title')?.textContent || '';
  const description = channel.querySelector('description')?.textContent || '';

  const items = channel.querySelectorAll('item');
  if (items.length === 0) {
    const err = new Error('Parsing error');
    err.type = 'parsing';
    throw err;
  }

  const posts = Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
  }));

  return { feed: { title, description }, posts };
};

export { loadFeed, parseFeed };