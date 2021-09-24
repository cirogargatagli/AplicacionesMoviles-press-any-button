import { get } from "./apiService.js"

const URL = 'https://www.cheapshark.com/api/1.0/'

const urlStores = URL + "stores"
const urlDeals = URL + "deals?pageNumber="
const urlGames = "https://www.cheapshark.com/api/1.0/games?ids="

export const getStores = () => {
    return get(urlStores);
}

export const getGameByTitle = (title) => {
    return get(urlGames + "?=" + title + "&limit=60&exact=0")
}

export const getDeals = (page) => {
    return get(urlDeals + page);
}
