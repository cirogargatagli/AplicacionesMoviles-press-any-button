import { getDealsByStoreID, getStores, redirectToDeal } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";
import { createPagination } from "../components/pagination.js";
import { urlLogos } from "./mainBusqueda.js";
import { obtenerOferta } from "./mainCompartir.js";

const main = document.querySelector("main")

const urlImages = "https://www.cheapshark.com/"

const pressRemoveFromCart = (i) => {

}

export let shareDealStore = {

}

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

                let divTitle = document.createElement("div");
                divTitle.className = "titulo-juego"
                const spanTitle = document.createElement("span");
                spanTitle.innerText = deal.title;
                divTitle.append(spanTitle)

                let divPrecio = document.createElement("div");
                divPrecio.className = "precio-bajo-juego"
                const spanPrecio = document.createElement("span");
                spanPrecio.innerText = "$" + deal.salePrice;
                divPrecio.append(spanPrecio)

                let divGame = document.createElement("article");
                divGame.className = "game"
                divGame.setAttribute("id", deal.dealID)
                divGame.setAttribute("name", deal.title)

                const divDetalleOferta = document.createElement("div");
                divDetalleOferta.className = "detalle-oferta";
                divDetalleOferta.style.display = "none";
                divDetalleOferta.innerHTML += `
                    <span>★ ${deal.dealRating}</span>
                `

                const a = document.createElement("a");
                let icon = document.createElement("img");
                icon.className = "icon-store";
                a.href = redirectToDeal + deal.dealID;
                a.target = "_blank";
                getStores().done(data => {
                    let store = data.filter(store => store.storeID == deal.storeID)[0];
                    icon.src = urlLogos + store.images.icon;
                })
                a.append(icon);

                const divBotones = document.createElement("div");
                divBotones.className = "deal-buttons";
                const aShare = document.createElement("a");
                aShare.href = "#Compartir";
                aShare.setAttribute = ("data-hash", "Compartir");
                const iShare = document.createElement("i");
                iShare.className = "fas fa-share-alt";
                aShare.append(iShare);
                const i = document.createElement("i");
                i.className = "fas fa-cart-plus";
                pressRemoveFromCart(i);

                obtenerOferta(aShare, divGame);

                divBotones.append(aShare, i);

                divDetalleOferta.append(a, divBotones);

                divGame.append(img, divTitle, divPrecio, divDetalleOferta);

                let ofertaVisitada = {
                    dealID: divGame.id,
                    img: divGame.childNodes[0].src,
                    title: divGame.getAttribute("name"),
                    price: divGame.childNodes[2].childNodes[0].innerText.split("$")[1],
                    count: 1
                }

                i.addEventListener("click", () => {
                    if (typeof (Storage) !== 'undefined') {
                        ofertaVisitada.storeIcon = divGame.childNodes[3].childNodes[3].childNodes[0].src;
                        ofertaVisitada.redirect = divGame.childNodes[3].childNodes[3].href;
                        let carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
                        if (carrito.length > 0) {
                            let existeOferta = false;
                            carrito.forEach(oferta => {
                                if (oferta.dealID == ofertaVisitada.dealID) {
                                    oferta.count++;
                                    existeOferta = true;
                                }
                            })
                            if (!existeOferta) {
                                carrito.push(ofertaVisitada);
                            }
                        } else {
                            carrito.push(ofertaVisitada);
                        }

                        localStorage.setItem("carrito", JSON.stringify(carrito))
                        alert("¡Se añadió correctamente el artículo al carrito!")
                    }
                })

                divGame.addEventListener("click", (e) => {
                    if (e.target.tagName != "A" && e.target.tagName != "I" && e.target.className != "icon-store") {
                        let articulo = document.getElementById(divGame.id);
                        articulo = $(articulo).find(".detalle-oferta");
                        if (articulo.is(':visible')) {
                            articulo.hide(300)
                        } else {
                            articulo.show(400);
                            if (typeof (Storage) !== 'undefined') {
                                let ofertaVisitada = {
                                    dealID: divGame.id,
                                    img: divGame.childNodes[0].src,
                                    title: divGame.getAttribute("name"),
                                    price: divGame.childNodes[2].childNodes[0].innerText.split("$")[1]
                                }
                                let visitados = JSON.parse(localStorage.getItem("visitados") || "[]");
                                visitados.push(ofertaVisitada);
                                localStorage.setItem("visitados", JSON.stringify(visitados))
                            }
                        }
                    }
                })
                divOfertas.append(divGame)
            })
            createPagination(page, parseInt(request.getResponseHeader('x-total-page-count')) + 1, arrayQuerys);
            quitarLoader("ofertas")
        })
        .fail((error) => {
            console.log(error)
        })
}