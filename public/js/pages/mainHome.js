import { getDestacados, redirectToDeal, getStores } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";
import { pressAddToCart, urlLogos } from "./mainBusqueda.js";

const main = document.querySelector("main");

export const mainHome = () => {
    main.innerHTML = `<section class="slider">
            <ul>
                <li><img src="../img/carrousel/fifa.jpg" alt=""></li>
                <li><img src="../img/carrousel/newWorld.jpeg" alt=""></li>
                <li><img src="../img/carrousel/diablo.jpg" alt=""></li>
                <li><img src="../img/carrousel/residentEvil.jpg" alt=""></li>
            </ul>
    </section>
    <section class="destacados">
        <h3>Destacados</h3>
        <div class="games"></div>
    </section>
    `
    mostrarDestacadas();
}

const mostrarDestacadas = () => {
    const divDestacadas = document.querySelector(".games");
    mostrarLoader("games")
    getDestacados()
        .done(destacadas => {
            destacadas.forEach(destacada => {
                let img = document.createElement("img");
                img.src = destacada.thumb;

                let divTitle = document.createElement("div");
                divTitle.className = "titulo-juego"
                const spanTitle = document.createElement("span");
                spanTitle.innerText = destacada.title;
                divTitle.append(spanTitle)

                let divPrecio = document.createElement("div");
                divPrecio.className = "precio-bajo-juego"
                const spanPrecio = document.createElement("span");
                spanPrecio.innerText = "$" + destacada.salePrice;
                divPrecio.append(spanPrecio)


                let divGame = document.createElement("article");
                divGame.className = "game"
                divGame.setAttribute("id", destacada.gameID)
                divGame.setAttribute("name", destacada.external)
                divGame.append(img, divTitle, divPrecio)

                divDestacadas.append(divGame)
            });
            quitarLoader("games")

        })
        .fail()
}