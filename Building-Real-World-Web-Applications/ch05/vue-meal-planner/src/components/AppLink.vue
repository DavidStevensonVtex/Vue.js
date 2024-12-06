<!-- Listing 5.20 The AppLink.vue file in the vue-meal-planner/src/components folder -->

<script setup lang="ts">
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <router-link :to="to" class="text-light-blue">
    <slot></slot>
  </router-link>
</template>
