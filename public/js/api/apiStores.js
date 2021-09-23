import { get } from "./apiService.js"

const urlStores = 'https://www.cheapshark.com/api/1.0/stores'

//const idStores = [0, 8, 9, 14]

export const getStores = () => {
    return get(urlStores);
}
