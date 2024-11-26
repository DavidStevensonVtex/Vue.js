<!-- Listing 4.11 The LoadingIndicator.vue file in the vue-marvel-explorer/src/components folder. -->

<script setup lang="ts">
const props = defineProps<{
  text?: string;
}>();
</script>
<template>
  <div
    class="flex flex-col items-center justify-center p-4 pt-16 min-h-min min-w-screen"
  >
    <div v-if="text" class="mb-4">
      {{ text }}
    </div>
    <div class="flex space-x-2 animate-pulse">
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
      <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
    </div>
  </div>
</template>
