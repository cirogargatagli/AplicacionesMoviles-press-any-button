import { mainDeals } from "./pages/mainOfertas.js";
import { mainStores } from "./pages/mainTiendas.js";

const main = document.querySelector("main")

const limpiarMain = () => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

const changePage = () => {
    let localizacion = location.hash.split("#")[1];
    limpiarMain();
    if (localizacion) {
        if (localizacion.includes("Ofertas")) {
            let page = parseInt(localizacion.split("=")[1]);
            mainDeals(page);
        }
        if (localizacion.includes("Tiendas")) {
            mainStores();
        }
    }
}

changePage();

window.addEventListener("hashchange", () => {
    changePage();
})

