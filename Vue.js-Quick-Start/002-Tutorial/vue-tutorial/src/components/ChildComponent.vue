<!-- Listing 1.26 The ChildComponent.vue file using Props in the vue-tutorial/src/components folder -->

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  msg: String,
});
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
