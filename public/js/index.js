import { mainContact } from "./pages/mainContacto.js";
import { mainDeals } from "./pages/mainOfertas.js";
import { mainTienda } from "./pages/mainTienda.js";
import { mainStores } from "./pages/mainTiendas.js";
import { getQuerys } from "./utils/querysURLUtils.js";

const main = document.querySelector("main")

const limpiarMain = () => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

const changePage = () => {
    let localizacion = location.hash.split("#")[1];
    limpiarMain();
    window.scrollTo(0, 0)
    if (localizacion) {
        if (localizacion.includes("Ofertas")) {
            let page = parseInt(localizacion.split("=")[1]);
            mainDeals(page);
        }
        if (localizacion == "Tiendas") {
            mainStores();
        }
        if (localizacion.includes("Tiendas?storeID")) {
            mainTienda(getQuerys());
        }
        if (localizacion == "Contacto") {
            mainContact();
        }
    }
}
changePage();

window.addEventListener("hashchange", () => {
    changePage();
})

