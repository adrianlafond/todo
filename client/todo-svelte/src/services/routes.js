import { readable } from 'svelte/store';
import page from 'page';

import TodoList from '../components/TodoList.svelte';
import TodoDetail from '../components/TodoDetail.svelte';
import Preferences from '../components/Preferences.svelte';
import NotFound from '../components/NotFound.svelte';

const initialState = {
  component: TodoList,
  context: { path: '', params: {} }
};

const update = set => {
  function onPage(event, component) {
    const { canonicalPath: path, params } = event;
    set({ component, context: { path, params } });
  }

  page.base('/');
  page('', () => page.redirect('/todos'));
  page('todos', event => onPage(event, TodoList));
  page('todo/:id', event => onPage(event, TodoDetail));
  page('preferences', event => onPage(event, Preferences));
  page('*', event => onPage(event, NotFound));
  page();

  return () => {
    // Stop all and clean up, but Page there is nothing to do.
  };
};

export default readable(initialState, update);
