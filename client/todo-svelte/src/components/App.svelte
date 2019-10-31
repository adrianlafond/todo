<script>
import { setContext, onDestroy } from 'svelte';
import { writable } from 'svelte/store';

import AppHeader from './AppHeader.svelte';
import Routes from '../services/routes';
import Preferences from '../services/preferences';

let hasThemeDark = false;
const prefsUnsubscribe = Preferences.subscribe(data => {
	hasThemeDark = data.theme === 'dark';
});

let pageComponent = null
const route = writable(null);
setContext('route', route);;

const routesUnsubscribe = Routes.subscribe(info => {
	pageComponent = info.component;
	route.set(info.context);
});

onDestroy(() => {
	prefsUnsubscribe();
	routesUnsubscribe();
})
</script>

<div class:theme-dark={hasThemeDark}>
	<AppHeader title='Todo Svelte' />
	<svelte:component this={pageComponent} />
</div>
