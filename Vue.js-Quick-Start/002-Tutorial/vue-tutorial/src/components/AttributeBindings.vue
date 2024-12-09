<!-- Listing 1.7 The AttributeBindings.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

const titleClass = ref("title");
</script>

<template>
  <h1 :class="titleClass">Make me red</h1>
  <!-- add dynamic class binding here -->
</template>

<style>
.title {
  color: red;
}
</style>
