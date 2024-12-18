// Listing 3.28 Using data-testid for the screen reader element in the WindDirection.spec.ts unit test in the vue-local-weather/src/components folder

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


    it("renders with the correct wind direction", (): void => {
        const wrapper = shallowMount(WindDirection, {
            props: {
                degrees: 90,
            },
        });
        const direction = wrapper.find("[data-testid=direction]");
        expect(direction.attributes("style")).toContain("rotate(90deg)");
        expect(direction.html()).toContain("⬇");
    });

    it("renders the correct wind direction for screen readers", (): void => {
        const wrapper = shallowMount(WindDirection, {
            props: {
                degrees: 270,
            },
        });
        const srOnly = wrapper.find("[data-testid=direction-sr]");
        expect(srOnly.classes()).toContain('sr-only')
        expect(srOnly.html()).toContain("Wind Direction: 270 degrees");
    });
});