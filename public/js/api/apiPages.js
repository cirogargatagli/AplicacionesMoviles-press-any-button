import { get } from "./apiService.js"

const URL = 'https://www.cheapshark.com/api/1.0/'

const urlStores = URL + "stores"
const urlDeals = URL + "deals?"
const urlGames = URL + "games?"
export const redirectToDeal = "https://www.cheapshark.com/redirect?dealID="

export const getStores = () => {
    return get(urlStores);
}

export const getGameByTitle = (title) => {
    return get(urlGames + "title=" + title + "&limit=60")
}

export const getDeals = (query) => {
    let queryPageSize = pageSize();
    return get(urlDeals + query + queryPageSize);
}

export const getDealsByStoreID = (query) => {
    let queryPageSize = pageSize();
    return get(urlDeals + query + queryPageSize)
}

export const getDealsByGameID = (gameID) => {
    return get(urlGames + "id=" + gameID)
}

export const getDestacados = () => {
    return get(urlDeals + "dealRating=10&pageSize=3");
}

const pageSize = () => {
    let queryPageSize = "&pageSize=";
    if (screen.width < 768) {
        return queryPageSize += "10";
    }
    if (screen.width < 1024) {
        return queryPageSize += "20";
    }

    return queryPageSize += "40";
}