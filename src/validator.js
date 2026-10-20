import * as yup from 'yup';
import { state } from './state.js';

const urlSchema = yup.string()
  .required('errors.required')
  .url('errors.url')
  .test('unique', 'errors.duplicate', value => (
    !state.feeds.some(feed => feed.url === value)
  ));

export const validateUrl = url => urlSchema.validate(url);
