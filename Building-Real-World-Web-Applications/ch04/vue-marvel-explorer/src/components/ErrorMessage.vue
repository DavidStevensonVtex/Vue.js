<!-- Listing 4.40 Displaying additional error information in the ErrorMessage.vue file in the vue-marvel-explorer/src/explorer folder -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const errorMessage: Ref<string> = ref("");

onMounted((): void => {
  console.log("route.query", route.query, "route.query.info", route.query.info);
  errorMessage.value = route.query.info as string;
});
</script>
<template>
  <article
    class="p-4 mx-4 my-24 bg-white rounded-lg shadow-xl place-content-center text-slate-800"
  >
    <header>
      <h1 class="pb-5 text-lg font-semibold">Oops!</h1>
    </header>
    {{ errorMessage }}
  </article>
</template>
