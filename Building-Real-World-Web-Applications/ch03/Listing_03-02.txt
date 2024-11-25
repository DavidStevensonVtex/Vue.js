<!-- Listing 3.2 The GetLocation.vue file in the vue-local-weather/src/components folder. -->

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

type Geolocation = {
  latitude: number;
  longitude: number;
};

const coords: Ref<Geolocation | undefined> = ref();
</script>
