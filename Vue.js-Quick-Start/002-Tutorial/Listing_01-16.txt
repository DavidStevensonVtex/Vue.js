<!-- Listing 1.16 The ListRendering.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

// give each todo a unique id
let id = 0;

const newTodo = ref("");
const todos = ref([
  { id: id++, text: "Learn HTML" },
  { id: id++, text: "Learn JavaScript" },
  { id: id++, text: "Learn Vue" },
]);

function addTodo() {
  console.log("newTodo", newTodo.value);
  const todo = { id: id++, text: newTodo.value };
  todos.value.push(todo);
  newTodo.value = "";
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t.id !== todo.id);
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
