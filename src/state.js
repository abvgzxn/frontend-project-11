import { proxy, subscribe } from 'valtio/vanilla';

const initialState = {
  form: {
    url: '',
    isValid: false,
    error: null,
  },
  feeds: [],
};

export const state = proxy(initialState);

export const subscribeToState = (callback) => {
  return subscribe(state, callback);
};
