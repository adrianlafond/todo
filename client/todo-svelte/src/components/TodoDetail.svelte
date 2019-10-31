<style>
.todo-detail {
  padding: 0 1rem 1rem;
}
.todo-detail__textarea {
  display: block;
  width: 100%;
  margin: 1rem 0;
}
</style>

<script>
import { getContext, onDestroy } from 'svelte';
import { Todos } from 'todo-shared';
import page from 'page';

export let todo = null;

let error = null;

function saveTodo() {
  Todos.update(todo.id, todo)
    .then(data => {
      todo = data;
      error = null;
    })
    .catch(err => error = err);
}

function deleteTodo() {
  Todos.delete(todo.id)
    .then(() => page('/'))
    .catch(err => error = err);
}

const route = getContext('route');
const unsubscribeRoute = route.subscribe(context => {
  Todos.read(context.params.id)
    .then(data => {
      todo = data;
      error = null;
    })
    .catch(err => error = err);
});

onDestroy(() => {
  unsubscribeRoute();
});
</script>

<div class="app-page">
  <div class="todo-detail">
    {#if error}
    <p>{error.message}</p>
    {:else if todo}
    <div>
      <label>
        <input
          type="checkbox"
          bind:checked={todo.complete}
          on:change={saveTodo}
        >
        complete
      </label>
      <textarea
        bind:value={todo.text}
        placeholder="title"
        rows="2"
        class="todo-detail__textarea"
        on:blur={saveTodo}
      ></textarea>
      <textarea
        bind:value={todo.notes}
        placeholder="notes"
        rows="4"
        class="todo-detail__textarea"
        on:blur={saveTodo}
      ></textarea>
      <button on:click={deleteTodo}>Delete</button>
    </div>
    {/if}
  </div>

</div>
