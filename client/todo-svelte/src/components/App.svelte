<script>
import { onMount, setContext } from 'svelte';
import { writable } from 'svelte/store';
import page from 'page';

import AppHeader from './AppHeader.svelte';
import TodoList from './TodoList.svelte';
import Preferences from './Preferences.svelte';
import NotFound from './NotFound.svelte';

import Todos from '../services/todos';

const route = writable({
	params: {},
	path: '',
});
setContext('route', route);

let pageComponent = TodoList;

function onPage(event, component) {
	pageComponent = component;
	route.set(event);
}

page.base('/');
page('', () => page.redirect('/todos'));
page('todos', event => onPage(event, TodoList));
page('todo/:id', event => onPage(event, TodoList));
page('preferences', event => onPage(event, Preferences));
page('*', event => onPage(event, NotFound));
page();
</script>

<AppHeader title='Todo Svelte' />

<svelte:component this={pageComponent} />
