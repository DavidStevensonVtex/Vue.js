<!-- Listing 1.20 The LifecycleAndTemplateRefs.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref, onMounted } from "vue";

const pElementRef = ref(null);

onMounted(() => {
  pElementRef.value.textContent = "Goodbye";
});
</script>

<template>
  <p ref="pElementRef">Hello</p>
</template>
