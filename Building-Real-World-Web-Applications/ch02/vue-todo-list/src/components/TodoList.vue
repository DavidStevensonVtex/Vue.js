<!-- Listing 2.6 The TodoList.vue file in the vue-todo-list/src/components folder. -->

<script setup lang="ts">
import ListItem from './ListItem.vue'
</script>

<template>
  <ul>
    <ListItem :is-checked="false">This is the slotted content.</ListItem>
  </ul>
</template>
