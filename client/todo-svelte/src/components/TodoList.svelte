<script>
// import Todos from '../services/todos';
import { Todos } from 'todo-shared';

let todos = [];
let error = null;
Todos.read()
  .then(data => {
    todos = data || [];
    error = null;
  })
  .catch(err => {
    todos = [];
    error = err;
  });
</script>


<div class="app-page">
<h1>Todo List</h1>

<ul>
{#each todos as todo}
  <li>{todo.text}</li>
{/each}
</ul>

{#if error}
<p>{error}</p>
{/if}
</div>