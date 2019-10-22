import App from './App.svelte';
import './global.css';

const root = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

window.app = root;

export default root;
