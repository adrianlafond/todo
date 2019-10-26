<script>
import { onMount } from 'svelte';
import page from 'page';

import AppHeader from './AppHeader.svelte';
import TodoList from './TodoList.svelte';
import Preferences from './Preferences.svelte';
import NotFound from './NotFound.svelte';

let pageComponent = TodoList;

page.base('/');
page('', () => pageComponent = TodoList);
page('todos', () => pageComponent = TodoList);
page('preferences', () => pageComponent = Preferences);
page('*', () => pageComponent = NotFound);
page();
</script>

<AppHeader title='Todo Svelte' />

<svelte:component this={pageComponent} />
