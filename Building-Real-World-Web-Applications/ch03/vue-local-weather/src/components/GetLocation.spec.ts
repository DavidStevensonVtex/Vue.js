// Listing 3.30 The GetLocation.spec.ts unit test file succeeds in the vue-local-weather/src/components folder

import { shallowMount } from "@vue/test-utils";
import GetLocation from "./GetLocation.vue";

describe("GetLocation", () => {
    it("should render the component without crashing", async (): Promise<void> => {
        global.navigator.geolocation = {
            getCurrentPosition: () => { },
        };
        const wrapper = await shallowMount(GetLocation);
        expect(wrapper).toBeTruthy();
    });
});
