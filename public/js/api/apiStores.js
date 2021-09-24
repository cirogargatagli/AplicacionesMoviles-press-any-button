import { get } from "./apiService.js"

const urlStores = 'https://www.cheapshark.com/api/1.0/stores'
const urlGames = "https://www.cheapshark.com/api/1.0/games?ids="

export const getStores = () => {
    return get(urlStores);
}

export const getGameByTitle = (title) => {
    return get(urlGames + "?=" + title + "&limit=60&exact=0")
}
