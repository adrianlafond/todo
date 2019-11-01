<style>
.container {
  display: inline-block;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid black;
  background: #DCDCDC;
}
</style>

<script>
import { onDestroy } from 'svelte';
import Preferences from '../services/preferences';

let theme = '';

const unsubscribe = Preferences.subscribe(data => theme = data.theme);

onDestroy(unsubscribe);
</script>

<div class='container'>
  <p>Theme: <strong>{theme}</strong></p>
</div>
