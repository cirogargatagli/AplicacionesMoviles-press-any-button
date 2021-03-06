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
    <section class="visitados">
    </section>
    <section class="destacadas">
        <h3>Ofertas destacadas</h3>
        <div class="ofertas ofertasDestacadas">
        </div>
    </section>
    <section class="lanzamientos">
        <h3>Próximos lanzamientos</h3>
        <iframe class="video-home" src="https://www.youtube-nocookie.com/embed/iA3-Lyl7VcI?start=5" title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
        >
        </iframe>
        </iframe>
    </section>
    `
    mostrarVisitados();
    mostrarDestacadas();

}

const mostrarVisitados = () => {
    const sectionVisitados = document.querySelector(".visitados");
    const divVisitados = document.createElement("div");
    divVisitados.className = "ofertas";
    let visitados = JSON.parse(localStorage.getItem("visitados") || "[]")
    if (visitados.length) {
        let titulo = document.createElement("h3");
        titulo.innerText = "Últimas visitas";

        visitados.forEach((visitado, index) => {
            if (index <= 2) {
                let img = document.createElement("img");
                img.src = visitado.img;

                let divTitle = document.createElement("div");
                divTitle.className = "titulo-juego"
                const spanTitle = document.createElement("span");
                spanTitle.innerText = visitado.title;
                divTitle.append(spanTitle)

                let divPrecio = document.createElement("div");
                divPrecio.className = "precio-bajo-juego"
                const spanPrecio = document.createElement("span");
                spanPrecio.innerText = "$" + visitado.price;
                divPrecio.append(spanPrecio)


                let divGame = document.createElement("article");
                divGame.className = "game"
                divGame.setAttribute("id", visitado.dealID)
                divGame.setAttribute("name", visitado.title)
                divGame.append(img, divTitle, divPrecio)

                divVisitados.append(divGame)
            }
        })
        sectionVisitados.append(titulo, divVisitados)
        main.append(sectionVisitados)
    }
}

const mostrarDestacadas = () => {
    const divDestacadas = document.querySelector(".ofertasDestacadas")
    mostrarLoader("ofertasDestacadas")
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
                divGame.setAttribute("id", destacada.dealID)
                divGame.setAttribute("name", destacada.title)
                divGame.append(img, divTitle, divPrecio)

                divDestacadas.append(divGame)
            });
            quitarLoader("ofertasDestacadas")
        })
        .fail(error => {
            console.log(error)
        })
}