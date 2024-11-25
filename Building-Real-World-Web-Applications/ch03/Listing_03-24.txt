// Listing 3.24 Creating WindDirection.spec.ts unit test in the vue-local-weather/src/components folder

import { shallowMount } from "@vue/test-utils";
import WindDirection from "./WindDirection.vue";

describe("WindDirection", () => {
    it("renders without crashing", (): void => {
        const wrapper = shallowMount(WindDirection, {
            props: {
                degrees: 90,
            },
        });
        expect(wrapper).toBeTruthy();
    });
});