import { getDeals } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";
import { createPagination } from "../components/pagination.js";

const main = document.querySelector("main");

export const mainDeals = (page) => {
    const section = document.createElement("section");
    section.className = "section";
    const ofertas = document.createElement("div");
    ofertas.className = "ofertas";
    ofertas.setAttribute("id", "ofertas")
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Ofertas"
    section.append(titulo, ofertas)
    main.append(section)

    createDeals(page);
}

const createDeals = (page) => {
    const divOfertas = document.getElementById("ofertas")
    mostrarLoader("ofertas");
    getDeals(page - 1)
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
            createPagination(page, parseInt(request.getResponseHeader('x-total-page-count')) + 1);
            quitarLoader("ofertas")
        })
        .fail(() => {
            alert("error")
        })
}