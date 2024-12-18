// Listing 5.8 The recipeApi.ts file in the vue-meal-planner/src/composables folder

import type { SearchRecipe, Recipe } from '@/types/spoonacular'

const apiKey = import.meta.env.VITE_APP_SPOONACULAR_API;
const RECIPE_API = "https://api.spoonacular.com"
const API_SIGN = `apiKey=${apiKey}`

interface ApiOptions {
    query?: string;
}

export const useRecipeAPI = async (path: string, options?: ApiOptions): Promise<unknown> => {
    const query = options?.query ? getQuery(options?.query) : '';

    const requestURI = getRequestURI(path, query);

    return useFetch(requestURI);
}

const getQuery = (query?: string): string => {
    return query ? `&query=${query}` : ''
}

const getRequestURI = (path: string, query?: string): string => {
    const apiPath = `${RECIPE_API}/${path}`;
    return `${apiPath}?${API_SIGN}${query}`;
}

export const useFetch = async (requestURI: string): Promise<unknown> => {
    const res = await fetch(requestURI);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const jsonRes = await res.json();
    return jsonRes as unknown;
}

export const useRecipeSearch = async (query: string): Promise<SearchRecipe> => {
    try {
        return await useRecipeAPI('recipes/search', { query }) as SearchRecipe
    } catch {
        throw new Error('An error occurred while trying to search recipes');
    }
}

export const useRecipeInformation = async (id: string): Promise<Recipe> => {
    try {
        return await useRecipeAPI(`recipes/${id}/information`) as Recipe
    } catch {
        throw new Error('An error occurred while trying to retrieve recipe information');
    }
}