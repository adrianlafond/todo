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
import Preferences from '../services/preferences';

let theme = '';

Preferences.subscribe(data => theme = data.theme);
</script>

<div class='container'>
  <p>Theme: <strong>{theme}</strong></p>
</div>
