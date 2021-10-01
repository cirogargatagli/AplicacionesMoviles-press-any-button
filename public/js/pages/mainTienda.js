import { getDealsByStoreID, getStores } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";
import { createPagination } from "../components/pagination.js";

const main = document.querySelector("main")

const urlImages = "https://www.cheapshark.com/"

export const mainTienda = (arrayQuerys) => {
    const section = document.createElement("section");
    section.className = "section";
    const ofertas = document.createElement("div");
    ofertas.className = "ofertas";
    ofertas.setAttribute("id", "ofertas")
    const titulo = document.createElement("h3");
    const divBanner = document.createElement("div");
    divBanner.className = "banner"
    const banner = document.createElement("img");
    divBanner.append(banner)

    let storeIDQuery = "";
    arrayQuerys.forEach(q => {
        if (q.clave == "storeID") {
            storeIDQuery = q.valor
        }
    })

    getStores()
        .done(data => {
            data.forEach(store => {
                if (store.storeID == storeIDQuery) {
                    banner.src = urlImages + store.images.banner
                }
            })
        })
        .fail()
    section.append(divBanner, ofertas)
    main.append(section)

    createTienda(arrayQuerys)
}

const createTienda = (arrayQuerys) => {
    const divOfertas = document.getElementById("ofertas")
    mostrarLoader("ofertas");

    let query = "";
    let page = "";

    arrayQuerys.forEach((q, index) => {
        query += q.clave + "=" + q.valor;
        if (arrayQuerys.length - 1 != index) {
            query += "&"
        }
        if (q.clave == "pageNumber") {
            page = q.valor;
        }
    })

    getDealsByStoreID(query)
        .done((data, textStatus, request) => {
            data.forEach(deal => {
                let img = document.createElement("img");
                img.src = deal.thumb;
                let divDeal = document.createElement("article");
                divDeal.className = "oferta"
                divDeal.setAttribute("id", deal.dealID)
                divDeal.setAttribute("name", deal.title)
                divDeal.append(img)
                divOfertas.append(divDeal)
            })
            createPagination(page, parseInt(request.getResponseHeader('x-total-page-count')) + 1, arrayQuerys);
            quitarLoader("ofertas")
        })
        .fail((error) => {
            console.log(error)
        })
}