<!-- Listing 3.3 The GetLocation.vue file in the vue-local-weather/src/components folder. -->

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

type Geolocation = {
  latitude: number;
  longitude: number;
};

const coords: Ref<Geolocation | undefined> = ref();
const geolocationBlockedByUser: Ref<boolean> = ref(false);

const getGeolocation = async (): Promise<void> => {
  await navigator.geolocation.getCurrentPosition(
    async (position: { coords: Geolocation }) => {},
    (error: { message: string }) => {
      geolocationBlockedByUser.value = true;
      console.error(error.message);
    }
  );
};
</script>
