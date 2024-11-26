<!-- Listing 4.23 Adding paging to the ComicsOverview.vue file in the vue-marvel-explorer/src/components folder -->

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";

import { useComics } from "@/composables/marvelApi";
import type { Comic } from "@/types/marvel";

import LoadingIndicator from "./LoadingIndicator.vue";
import ComicCard from "./ComicCard.vue";
import Pagination from "./Pagination.vue";

const route = useRoute();

const isLoading: Ref<boolean> = ref(false);
const data: Ref<Comic[] | undefined> = ref();
const currentPage: Ref<number | string> = ref(0);
const totalPages: Ref<number> = ref(0);

if (route.params.page) {
  currentPage.value = +route.params.page;
}

const getComics = async () => {
  isLoading.value = true;
  const comics = await useComics();

  currentPage.value = comics?.offset / comics?.limit || 0;
  totalPages.value = Math.ceil(comics.total / comics.limit);

  data.value = comics.results;
  isLoading.value = false;
};

onMounted(async () => {
  await getComics();
});
</script>

<template>
  <div>
    <LoadingIndicator v-if="isLoading" text="Loading comics..." />
    <div v-if="data && !isLoading">
      <div
        class="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <ComicCard
          :comic="comic"
          :key="comic.id"
          v-for="comic in data"
        ></ComicCard>
        <Pagination
          :total-pages="totalPages"
          path="/"
          :current-page="+currentPage"
        ></Pagination>
      </div>
    </div>
  </div>
</template>
