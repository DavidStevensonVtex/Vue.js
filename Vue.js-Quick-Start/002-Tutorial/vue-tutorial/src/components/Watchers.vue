<!-- eslint-disable vue/multi-word-component-names -->
<!-- Listing 1.22 The Watchers.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref, watch } from "vue";

const todoId = ref(1);
const todoData = ref(null);

async function fetchData() {
  todoData.value = null;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  todoData.value = await res.json();
}

watch(todoId, (todoId) => {
  // yes, console.log() is a side effect
  console.log(`new todoId is: ${todoId.value}`);
  fetchData();
});
fetchData();
</script>

<template>
  <p>Todo id: {{ todoId }}</p>
  <button @click="todoId++" :disabled="!todoData">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>
</template>
