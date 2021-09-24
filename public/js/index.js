import { getGameByTitle } from "./api/apiStores.js";
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
    switch (localizacion) {
        case "Home":
            break;
        case "Tiendas":
            mainStores();
            break;;
        case "Ofertas":
            break;
    }
}

changePage();

window.addEventListener("hashchange", () => {
    changePage();
})

