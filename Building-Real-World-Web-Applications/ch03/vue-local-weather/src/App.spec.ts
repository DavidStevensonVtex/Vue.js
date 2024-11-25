// Listing 3.18 The App.spec.ts test file in the vue-local-weather/src folder.

import { describe, it, expect } from 'vitest';
import { shallowMount } from "@vue/test-utils";
import GetLocation from "./components/GetLocation.vue";
import App from "./App.vue";

describe("App", (): void => {
    it("renders GetLocation component", (): void => {
        const wrapper = shallowMount<typeof App>(App);
        expect(wrapper.findComponent(GetLocation).exists()).toBe(true);
    });
});