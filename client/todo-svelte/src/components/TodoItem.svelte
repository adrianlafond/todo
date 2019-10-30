<style>
.todo-item {
  position: relative;
  padding: 1rem;
  border-width: 1px 0 0;
  border-style: solid;
  border-color: var(--mid-color);
  background-color: var(--page-bg-color);
  color: var(--page-fg-color);
  height: 3.5rem;
}
.todo-item--last {
  border-bottom-width: 1px;
}
.todo-item--complete {
  background-color: var(--page-bg-color-2);
  color: var(--page-fg-color-2);
}

.todo-item__checkbox {
  margin-right: 0.5rem;
}

.todo-item__input-text {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.todo-item__detail-link {
  position: absolute;
  right: 0;
  top: 0;
  width: 48px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--link-color);
}
.todo-item__detail-link:visited {
  color: var(--link-visited);
}
.todo-item__detail-link:hover {
  background-color: var(--page-bg-color-2);
}
</style>

<script>
import { tick } from 'svelte';
import { Todos } from 'todo-shared';

import { link } from '../services/link';

export let todo = null;
export let isLast = false;

let isEditing = false;
let textInput = null;
let error = null;

function onStartTextChange() {
  isEditing = true;
}

function onInputKey(event) {
  if (event.key === 'Enter') {
    event.target.blur();
  }
}

function save() {
  Todos.update(todo.id, todo)
    .then(data => {
      todo = data;
      error = null;
    })
    .catch(err => {
      error = err;
    });
  isEditing = false;
}

async function enableEditing() {
  isEditing = true;
  // Apparently "autoFocus" is bad for accessibility ... so this is OK?
  await tick();
  textInput.focus();
}
</script>

<li
  class="todo-item"
  class:todo-item--complete={todo.complete}
  class:todo-item--last={isLast}>
  <input
    bind:checked={todo.complete}
    type="checkbox"
    class="todo-item__checkbox"
  >
  {#if isEditing}
  <input
    type="text"
    bind:value={todo.text}
    on:blur={save}
    on:keypress={onInputKey}
    bind:this={textInput}
    class="todo-item__input-text"
  >
  {:else}
  <label
    on:click={enableEditing}>
    {todo.text}
  </label>
  {/if}

  <a href={`/todos/${todo.id}`} on:click={link} class="todo-item__detail-link">
    <i class="material-icons app-header__icon-link">keyboard_arrow_right</i>
  </a>
</li>
