import { mainTiendas } from "./pages/mainTiendas.js";

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
        case "Juegos":
            break;
        case "Tiendas":
            mainTiendas();
            break;;
        case "Ofertas":
            break;
    }
}

changePage();



window.addEventListener("hashchange", () => {
    changePage();
})

