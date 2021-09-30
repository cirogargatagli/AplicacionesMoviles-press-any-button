import { get } from "./apiService.js"

const URL = 'https://www.cheapshark.com/api/1.0/'

const urlStores = URL + "stores"
const urlDeals = URL + "deals?"
const urlGames = "https://www.cheapshark.com/api/1.0/games?ids="

export const getStores = () => {
    return get(urlStores);
}

export const getGameByTitle = (title) => {
    return get(urlGames + "?=" + title + "&limit=60&exact=0")
}

export const getDeals = (page) => {
    const queryMobile = navigator.userAgentData.mobile ? "&pageSize=20" : ""
    return get(urlDeals + "pageNumber=" + page + queryMobile);
}

export const getDealsByStoreID = (query) => {
    const queryMobile = navigator.userAgentData.mobile ? "&pageSize=20" : ""
    return get(urlDeals + query + queryMobile)
}