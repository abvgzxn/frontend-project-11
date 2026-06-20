import { proxy, subscribe } from 'valtio/vanilla';

const initialState = {
  form: {
    url: '',
    isValid: false,
    errorKey: null,
  },
  feeds: [],
  posts: []
};

export const state = proxy(initialState);

export const subscribeToState = (callback) => {
  return subscribe(state, callback);
};
