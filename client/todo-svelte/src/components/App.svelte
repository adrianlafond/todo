<script>
import { setContext, onDestroy } from 'svelte';
import { writable } from 'svelte/store';;

import AppHeader from './AppHeader.svelte';

import Routes from '../services/routes';
import Todos from '../services/todos';

let pageComponent = null
const route = writable(null);
setContext('route', route);;

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
