<!-- Listing 2.5 Adding ListItem.vue file in the vude-todo-list/src/components folder. -->

<script lang="ts" setup>
interface Props {
  isChecked?: boolean | false
}

const props = defineProps<Props>()
</script>
<template>
  <label :class="{ checked: props.isChecked }">
    <input type="checkbox" :checked="props.isChecked" />
    <slot></slot>
  </label>
</template>

<style scoped>
label {
  cursor: pointer;
}
.checked {
  text-decoration: line-through;
}
</style>
