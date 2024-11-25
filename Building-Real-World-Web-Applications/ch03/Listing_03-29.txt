// Listing 3.29 The GetLocation.spec.ts unit test file fails in the vue-local-weather/src/components folder

import { shallowMount } from "@vue/test-utils";
import GetLocation from "./GetLocation.vue";

describe("GetLocation", () => {
    it("should render the component without crashing", async (): Promise<void> => {
        const wrapper = await shallowMount(GetLocation);
        expect(wrapper).toBeTruthy();
    });
});
