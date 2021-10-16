import { mainBusqueda } from "./pages/mainBusqueda.js";
import { mainCarrito } from "./pages/mainCarrito.js";
import { mainContact } from "./pages/mainContacto.js";
import { mainHome } from "./pages/mainHome.js";
import { mainDeals } from "./pages/mainOfertas.js";
import { mainTienda } from "./pages/mainTienda.js";
import { mainStores } from "./pages/mainTiendas.js";
import { mainCompartir } from "./pages/mainCompartir.js";
import { getQuerys } from "./utils/querysURLUtils.js";

const main = document.querySelector("main")
const itemsMenu = document.querySelectorAll(".item-menu-enlace")

const toggleIconsMenu = (id) => {
    $(".icon-active").toggleClass("icon-active")
    $("#" + id).toggleClass("icon-active")
    $("#" + id + "-desktop").toggleClass("icon-active")
}
const changePage = () => {
    let localizacion = location.hash.split("#")[1];
    $("main").empty();
    window.scrollTo(0, 0)
    if (localizacion) {
        if ($(".carrito-active").length) {
            $(".carrito").toggleClass("carrito-active")
        }
        toggleIconsMenu(localizacion.split("?")[0])
        if (localizacion == "Home") {
            mainHome();
        }
        if (localizacion == "Carrito") {
            $(".carrito").toggleClass("carrito-active")
            mainCarrito();
        }
        if (localizacion.includes("Ofertas")) {
            mainDeals(getQuerys());
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
        if (localizacion.includes("Busqueda")) {
            mainBusqueda();
        }
        if (localizacion.includes("Compartir")) {
            mainCompartir();
        }
    }
}
window.addEventListener('resize', () => {
    $(".menu").slideUp(1)
});

if ($(".hamburguesa").length > 0) {
    const menu = $(".menu")
    $(".hamburguesa").click(() => {
        if (menu.css("display") == "none") {
            menu.slideDown()
            menu.css("display", "flex")
        } else {
            menu.slideUp()
        }
    })
    $(".item-menu-enlace").click(item => {
        $(".menu").slideUp()
    })
}

location.hash = "#Home"
changePage();


window.addEventListener("hashchange", () => {
    changePage();
})