<!-- Listing 1.5 Declarative Rendering using reactive and ref functions -->

<script setup>
import { reactive } from "vue";
import { ref } from "vue";

const counter = reactive({
  count: 0,
});

console.log(counter.count); // 0
counter.count++;

const message = ref("Hello World!");

console.log(message.value); // "Hello World!"
message.value = "Changed";
</script>

<template>
  <h1>{{ message }}</h1>
  <h1>{{ message.split("").reverse().join("") }}</h1>
  <p>Count is: {{ counter.count }}</p>
</template>
