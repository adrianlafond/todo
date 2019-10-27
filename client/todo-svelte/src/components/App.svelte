<script>
import { setContext, onDestroy } from 'svelte';
import { writable } from 'svelte/store';
import page from 'page';

import AppHeader from './AppHeader.svelte';
import TodoList from './TodoList.svelte';
import Preferences from './Preferences.svelte';
import NotFound from './NotFound.svelte';

import Routes from '../services/routes';
import Todos from '../services/todos';

const route = writable({
	params: {},
	path: '',
});
setContext('route', route);

let pageComponent = null;

const routes = Routes.subscribe(info => {
	pageComponent = info.component;
	route.set(info.context);
});

onDestroy(() => {
	routes.unsubscribe();
})
</script>

<AppHeader title='Todo Svelte' />

<svelte:component this={pageComponent} />
