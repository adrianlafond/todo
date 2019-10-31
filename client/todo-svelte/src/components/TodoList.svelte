<style>
.todos__title {
  padding: 1rem;
}
.todos-list__list {
  /* merely setting a class causes a reset */
}
.todos-list__admin {
  margin: 1rem 0;
}
</style>

<script>
import { Todos } from 'todo-shared';
import TodoItem from './TodoItem.svelte';

let todos = [];
let error = null;

function isLast(index) {
  return index === todos.length - 1;
}

function fetch() {
  Todos.read()
    .then(data => {
      todos = data || [];
      error = null;
    })
    .catch(err => {
      todos = [];
      error = err;
    });
}

function add() {
  Todos.create()
    .then(data => {
      todos.push(data);
      todos = todos.slice(0);
      error = null;
    })
    .catch(err => {
      error = err;
    });
}

function reset() {
  Todos.reset()
    .then(data => {
      todos = data;
      error = null;
    })
    .catch(err => {
      error = err;
    });
}

fetch();
</script>


<div class="app-page">
  <h2 class="todos__title">Todo List</h2>

  {#if error}
  <p>{error}</p>
  {:else}
  <ul class="todos-list__list">
    {#each todos as todo, index (todo.id)}
      <TodoItem todo={todo} isLast={isLast(index)} />
    {/each}
  </ul>
  {/if}

  <div class="todos-list__admin">
    <button on:click={add}>Add new todo</button>
    <button on:click={reset}>Reset all todos</button>
  </div>
</div>
