import { test } from 'node:test';
import assert from 'node:assert/strict';
import axios from 'axios';
import { state } from '../src/state.js';
import { validateUrl } from '../src/validator.js';
import { loadFeed } from '../src/parser.js';

test('validation reports required, URL and duplicate types and allows correction', async () => {
  await assert.rejects(validateUrl(''), { type: 'required' });
  await assert.rejects(validateUrl('not a URL'), { type: 'url' });
  const url = 'https://ru.hexlet.io/lessons.rss';
  await assert.doesNotReject(validateUrl(url));
  state.feeds.push({ url });
  try {
    await assert.rejects(validateUrl(url), { type: 'unique' });
    await assert.doesNotReject(validateUrl('https://lorem-rss.hexlet.app/feed'));
  } finally {
    state.feeds.splice(0);
  }
});

test('loader encodes the complete URL and classifies failed requests', async () => {
  const originalAdapter = axios.defaults.adapter;
  const url = 'https://example.com/feed?a=1&b=2';
  axios.defaults.adapter = async (config) => {
    const proxy = new URL(config.url);
    assert.equal(proxy.origin, 'https://allorigins.hexlet.app');
    assert.equal(proxy.pathname, '/get');
    assert.equal(proxy.searchParams.get('url'), url);
    assert.equal(proxy.searchParams.get('disableCache'), 'true');
    throw new Error('Connection refused');
  };
  try {
    await assert.rejects(loadFeed(url), { type: 'network' });
  } finally {
    axios.defaults.adapter = originalAdapter;
  }
});
