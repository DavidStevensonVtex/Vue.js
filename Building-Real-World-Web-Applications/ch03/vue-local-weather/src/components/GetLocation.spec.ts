// Listing 3.31 Mocking function for success GetLocation.spec.ts unit test file in the vue-local-weather/src/components folder

import { vi } from 'vitest'
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

    it("displays when geolocation resolved successfully", async (): Promise<void> => {
        const mockGeoLocation = vi.fn((successCallback: Function) => {
            const position = {
                coords: {
                    latitude: 51.5074, // Example latitude
                    longitude: -0.1278, // Example longitude
                },
            };
            successCallback(position);
        });
        global.navigator.geolocation = {
            getCurrentPosition: mockGeoLocation,
        };

        const wrapper = await shallowMount(GetLocation);
        expect(wrapper.vm.coords).toEqual({
            latitude: 51.5074,
            longitude: -0.1278,
        });
    });
});
