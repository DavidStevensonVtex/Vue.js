<!-- Listing 2.11 Preserving changes to the list in the TodoList.vue file in the vue-todo-list/src/components folder. -->

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import ListItem from './ListItem.vue'

type Item = {
  title: string
  checked?: boolean
}

const storageItems: Ref<Item[]> = ref([])

const setToStorage = (items: Item[]): void => {
  localStorage.setItem('list-items', JSON.stringify(items))
}

const getFromStorage = (): Item[] | [] => {
  const stored = localStorage.getItem('list-items')
  if (stored) {
    return JSON.parse(stored)
  }
  return []
}

const listItems: Ref<Item[]> = ref([
  { title: 'Make a todo list app', checked: true },
  { title: 'Predict the weather', checked: false },
  { title: 'Play some tunes', checked: false },
  { title: "Let's get cooking", checked: false },
  { title: 'Pump some iron', checked: false },
  { title: 'Track my expenses', checked: false },
  { title: 'Organize a game night', checked: false },
  { title: 'Learn a new language', checked: false },
  { title: 'Publish my work' },
])

const sortedList = computed(() =>
  [...listItems.value].sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0)),
)

const updateItem = (item: Item): void => {
  const updatedItem = findItemInList(item)
  if (updatedItem) {
    toggleItemChecked(updatedItem)
  }
  console.log('listItems', listItems)
}

const findItemInList = (item: Item): Item | undefined => {
  return listItems.value.find((itemInList: Item) => itemInList.title === item.title)
}

const toggleItemChecked = (item: Item): void => {
  item.checked = !item.checked
}
</script>

<template>
  <ul>
    <li :key="key" v-for="(item, key) in sortedList">
      <ListItem :is-checked="item.checked" v-on:click.prevent="updateItem(item)">
        {{ item.title }}"
      </ListItem>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
}

li {
  margin: 0.4rem 0;
}
</style>
