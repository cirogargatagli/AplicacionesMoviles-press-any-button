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

export const getDeals = (page) => {
    let queryPageSize = pageSize();
    return get(urlDeals + "pageNumber=" + page + queryPageSize);
}

export const getDealsByStoreID = (query) => {
    let queryPageSize = pageSize();
    return get(urlDeals + query + queryPageSize)
}

export const getDealsByGameID = (gameID) => {
    return get(urlGames + "id=" + gameID)
}

const pageSize = () => {
    let queryMobile = "&pageSize=";
    if (screen.width < 768) {
        return queryMobile += "10";
    }
    if (screen.width < 1024) {
        return queryMobile += "20";
    }
}