import { mainContact } from "./pages/mainContacto.js";
import { mainHome } from "./pages/mainHome.js";
import { mainDeals } from "./pages/mainOfertas.js";
import { mainTienda } from "./pages/mainTienda.js";
import { mainStores } from "./pages/mainTiendas.js";
import { getQuerys } from "./utils/querysURLUtils.js";

const main = document.querySelector("main")
const hamburguesa = document.querySelector(".hamburguesa");
const menu = document.querySelector(".menu");
const itemsMenu = document.querySelectorAll(".item-menu-enlace")


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
        if (localizacion == "Home") {
            mainHome();
        }
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

if (!!hamburguesa) {
    hamburguesa.addEventListener("click", () => {
        menu.style.display == "block" ? menu.style.display = "none" : menu.style.display = "block"
    })
    itemsMenu.forEach(item => {
        item.addEventListener("click", () => {
            menu.style.display = "none"
        })
    })
}

location.hash = "#Home"
changePage();

window.addEventListener("hashchange", () => {
    changePage();
})

