<style>
.todos__title {
  padding: 1rem;
}
</style>

<script>
// import Todos from '../services/todos';
import { Todos } from 'todo-shared';

let todos = [];
let error = null;

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
    <!-- <app-todo-item
      *ngFor="let todo of todos; let isLast = last"
      [data]="todo"
      [isLast]="isLast">
    </app-todo-item> -->
    {#each todos as todo}
    <li>{todo.text}</li>
    {/each}
  </ul>
  {/if}

  <div class="todos-list__admin">
    <button on:click={add}>Add new todo</button>
    <button on:click={reset}>Reset all todos</button>
  </div>
</div>
