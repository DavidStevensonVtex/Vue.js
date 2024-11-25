// Listing 3.33 The WeatherReport.spec.ts unit test file in the vue-local-weather/src/components folder

import { vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import WeatherReport from './WeatherReport.vue'

describe('WeatherReport', () => {
    it("should render the component without crashing", (): void => {
        global.fetch = vi.fn() as any
        const wrapper = shallowMount(WeatherReport, {
            props: {
                coords: {
                    latitude: 0,
                    longitude: 0
                }
            }
        })
        expect(wrapper).toBeTruthy();
    });
});
