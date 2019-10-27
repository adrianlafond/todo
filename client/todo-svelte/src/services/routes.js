import { readable } from 'svelte/store';
import page from 'page';

import TodoList from '../components/TodoList.svelte';
import Preferences from '../components/Preferences.svelte';
import NotFound from '../components/NotFound.svelte';

const initialState = {
  component: TodoList,
  context: { path: '', params: {} }
};

const update = set => {
  function onPage(context, component) {
    set({ component, context });
  }

  page.base('/');
  page('', () => page.redirect('/todos'));
  page('todos', event => onPage(event, TodoList));
  page('todo/:id', event => onPage(event, TodoList));
  page('preferences', event => onPage(event, Preferences));
  page('*', event => onPage(event, NotFound));
  page();

  return () => {
    // stop all
  };
};

export default readable(initialState, update);
