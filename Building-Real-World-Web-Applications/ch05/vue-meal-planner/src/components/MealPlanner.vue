<!-- Listing 5.5 The MealPlanner.vue file in the vue-meal-planner/src/components folder -->

<script setup lang="ts">
import CalendarDays from "./CalendarDays.vue";
</script>

<template>
  <calendar-days :date="new Date()" :days="7" />
</template>
