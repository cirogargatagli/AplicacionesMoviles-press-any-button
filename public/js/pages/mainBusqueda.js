import { getDealsByGameID, getGameByTitle, getStores, redirectToDeal } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";


const main = document.querySelector("main");
const urlLogos = "https://www.cheapshark.com/";

export const mainBusqueda = () => {
    const section = document.createElement("section");
    section.className = "busqueda";
    const input = document.createElement("input");
    const label = document.createElement("label");
    const span = document.createElement("span");
    const i = document.createElement("i");
    const button = document.createElement("button");
    const form = document.createElement("form");
    const games = document.createElement("section")

    games.className = "games"
    i.className = "fab fa-searchengin";
    button.setAttribute("type", "submit");
    button.className = "button-busqueda";
    button.setAttribute("type", "submit")
    form.className = "input-busqueda";
    input.setAttribute("type", "text");
    input.setAttribute("id", "busqueda");
    input.required = true;
    label.setAttribute("for", "busqueda");
    label.className = "lbl-busqueda";
    span.className = "text-busqueda";
    span.innerText = "¡Busca tu juego!";

    label.append(span);
    button.append(i);
    form.append(input, label, button);
    section.append(form)

    main.append(section, games)
    addEventBuscar();
}

const addEventBuscar = () => {
    const buttonBusqueda = document.querySelector(".button-busqueda");
    buttonBusqueda.addEventListener("click", (e) => {
        e.preventDefault();
        let value = document.getElementById("busqueda").value;
        buscar(value);
    })
}

const buscar = (title) => {
    const divGames = document.querySelector(".games");
    $(".games").empty();
    mostrarLoader("games");
    getGameByTitle(title)
        .done(data => {
            data.forEach(game => {
                let img = document.createElement("img");
                img.src = game.thumb;

                let divTitle = document.createElement("div");
                divTitle.className = "titulo-juego"
                const spanTitle = document.createElement("span");
                spanTitle.innerText = game.external;
                divTitle.append(spanTitle)

                let divPrecio = document.createElement("div");
                divPrecio.className = "precio-bajo-juego"
                const spanPrecio = document.createElement("span");
                spanPrecio.innerText = "Desde: $" + game.cheapest;
                divPrecio.append(spanPrecio)


                let divGame = document.createElement("article");
                divGame.className = "game"
                divGame.setAttribute("id", game.gameID)
                divGame.setAttribute("name", game.external)
                divGame.append(img, divTitle, divPrecio)

                pressDivGame(divGame);

                divGames.append(divGame)
            })
            quitarLoader("games")
        })
        .fail(error => {
            console.log(error)
            quitarLoader("games")
        })
}

const pressDivGame = (divGame) => {
    divGame.addEventListener("click", (e) => {
        if (e.target.tagName != "A") {
            const articulo = $(".ofertas-por-tienda").parent();

            if (articulo.length == 0) {
                mostrarOfertas(divGame.id);
            } else {
                if (articulo.attr("id") != divGame.id) {
                    $(".ofertas-por-tienda").hide(300, () => {
                        $(".ofertas-por-tienda").remove();
                        mostrarOfertas(divGame.id);
                    });
                } else {
                    $(".ofertas-por-tienda").hide(300, () => {
                        $(".ofertas-por-tienda").remove();
                    });
                }
            }
        }
    })
}

const mostrarOfertas = (gameID) => {
    const divOfertas = document.createElement("div");
    divOfertas.className = "ofertas-por-tienda"
    divOfertas.style.display = "none"
    getDealsByGameID(gameID)
        .done(res => {
            res.deals.forEach(deal => {
                const divLine = document.createElement("div");
                divLine.className = "line-deal"


                let icon = document.createElement("img");
                const verEn = document.createElement("a");
                verEn.innerText = "Ir a"
                verEn.href = redirectToDeal + deal.dealID;
                verEn.target = "_blank"
                getStores().done(data => {
                    let store = data.filter(store => store.storeID == deal.storeID)[0]
                    icon.src = urlLogos + store.images.icon;
                    // spanTienda.innerText = store.storeName;
                })

                verEn.append(icon)
                const precio = document.createElement("div");
                const spanPrecio = document.createElement("span");
                spanPrecio.innerText = "$" + deal.price;
                precio.append(spanPrecio);

                divLine.append(verEn, precio);

                divOfertas.append(divLine);
            })
            document.getElementById(gameID).append(divOfertas);
            $(".ofertas-por-tienda").show(400);
        })
        .fail(error => {
            console.log(error)
        })
}