<!-- eslint-disable vue/multi-word-component-names -->
<!-- Listing 1.28 The Emits.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";
import ChildComponent from "./ChildComponent.vue";

const childMsg = ref("No child msg yet");
</script>

<template>
  <ChildComponent />
  <p>{{ childMsg }}</p>
</template>
