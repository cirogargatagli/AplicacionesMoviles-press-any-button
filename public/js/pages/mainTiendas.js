import { getStores } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";

const urlLogos = "https://www.cheapshark.com/";
const main = document.querySelector("main");

export const mainStores = () => {
    const section = document.createElement("section");
    section.className = "section";
    const tiendas = document.createElement("div");
    tiendas.className = "tiendas";
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Tiendas"
    section.append(titulo, tiendas)
    main.append(section)

    createStores();
}

export const createStores = () => {
    mostrarLoader("tiendas");
    getStores()
        .done((data) => {
            const tiendas = document.querySelector(".tiendas");
            data.forEach(store => {
                if (store.isActive == 1) {
                    let img = document.createElement("img");
                    img.src = urlLogos + store.images.logo;
                    let divStore = document.createElement("div");
                    divStore.className = "tienda"
                    divStore.setAttribute("id", store.storeID)
                    divStore.setAttribute("name", store.storeName)
                    divStore.append(img)
                    tiendas.append(divStore)
                }
            })
            quitarLoader("tiendas");
        })
        .fail(() => {
            alert("error")
        })
}



