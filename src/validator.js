import * as yup from 'yup';
import { state } from './state.js';


const urlShema = yup.string()
.required()
.url()
.test('unique','duplicate', function (value) {
const exists = state.feeds.some(feed => feed.url === value);
return !exists
})

export const validateUrl = (url) => {
  return urlShema.validate(url, {abortEarly: false});
};
