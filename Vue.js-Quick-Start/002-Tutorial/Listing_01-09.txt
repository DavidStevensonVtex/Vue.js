<!-- Listing 1.9 The EventListeners.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  // update component state
  count.value++;
}
</script>

<template>
  <!-- make this button work -->
  <button @click="increment">Count is: {{ count }}</button>
</template>
