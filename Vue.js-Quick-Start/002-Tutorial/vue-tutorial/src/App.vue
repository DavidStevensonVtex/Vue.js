<!-- Listing 1.31 The App.vue file using Slots in the vue-tutorial/src folder for Child Component example -->

<script setup>
import { ref } from "vue";
import ChildComponent from "./components/ChildComponent.vue";

const msg = ref("from parent");
</script>

<template>
  <ChildComponent></ChildComponent>
  <ChildComponent>
    <div>
      <p>This is some slot content!</p>
    </div>
  </ChildComponent>
  <ChildComponent>Message: {{ msg }}</ChildComponent>
</template>
