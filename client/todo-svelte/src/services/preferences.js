import { writable } from 'svelte/store';

const initialState = {
  theme: 'light'
};

const model = writable(initialState);

export default class Preferences {
  static subscribe(callback) {
    return model.subscribe(callback);
  }

  static setTheme(value) {
    model.update(data => {
      data.theme = value;
      return data;
    });
  }
}
