<!-- Listing 1.29 The App.vue file in the vue-tutorial/src folder for Child Component example -->

<script setup>
import { ref } from "vue";
import ChildComponent from "./components/ChildComponent.vue";

const childMsg = ref("No child msg yet");
</script>

<template>
  <ChildComponent @response="(msg) => (childMsg = msg)" />
  <p>{{ childMsg }}</p>
</template>
