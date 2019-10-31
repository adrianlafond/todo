<style>
.prefs {
  padding: 1rem;
}
.prefs-block {
  margin: 1rem 0;
}
.prefs-label {
  display: block;
}
</style>

<script>
import { onDestroy } from 'svelte';
import Preferences from '../services/preferences';

let theme;

Preferences.subscribe(data => theme = data.theme)();

function onChangeTheme() {
  Preferences.setTheme(theme)
}
</script>

<div class="app-page">
  <div class="prefs">
    <h2>Preferences</h2>

    <div class="prefs-block">
      <h4>Theme</h4>
      <label class="prefs-label">
        <input type="radio" name="theme" value="dark" bind:group={theme} on:change={onChangeTheme}> Dark
      </label>
      <label class="prefs-label">
        <input type="radio" name="theme" value="light" bind:group={theme} on:change={onChangeTheme}> Light
      </label>
    </div>
  </div>
</div>