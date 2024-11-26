// Listing 4.24 Adding pagination marvelApi.ts file in the vue-marvel-explorer/src/composables folder

import type { Comics } from "@/types/marvel"

export const useComics = async (page: number = 0): Promise<Comics> => {
    const apiKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC;
    const MARVEL_API = `https://gateway.marvel.com/v1/public`
    const API_SIGN = `apikey=${apiKey}`

    const ITEMS_PER_PAGE = 20;
    const pagination = page ? `&offset=${page * ITEMS_PER_PAGE}` : '';

    const requestURI = `${MARVEL_API}/comics?${API_SIGN}${pagination}`

    const res = await fetch(requestURI)
    const jsonRes = await res.json()

    return jsonRes.data
}