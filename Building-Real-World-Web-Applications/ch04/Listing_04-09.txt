// Listing 4.9 The marvelApi.ts file in the vue-marvel-explorer/src/composables folder

import type { Comics } from "@/types/marvel"

export const useComics = async (): Promise<Comics> => {
    const apiKey = import.meta.env.VITE_APP_MARVEL_API_PUBLIC;
    const MARVEL_API = `https://gateway.marvel.com/v1/public`
    const API_SIGN = `apikey=${apiKey}`

    const requestURI = `${MARVEL_API}/comics?${API_SIGN}`

    const res = await fetch(requestURI)
    const jsonRes = await res.json()

    return jsonRes.data
}