<!-- Listing 5.4 The CalendarDays.vue file in the vue-meal-planner/src/components folder -->

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Upcoming days</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in cards" :key="card.date.toString()">
        <td class="py-4">
          {{ card.content }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
