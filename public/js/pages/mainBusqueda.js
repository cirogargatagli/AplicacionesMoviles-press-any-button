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
    i.className = "fas fa-search";
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
        if (value.length > 0) {
            buscar(value);
        }
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

                let dealCarrito = {};
                dealCarrito.title = game.external;
                dealCarrito.img = game.thumb;
                dealCarrito.cheapest = game.cheapest;

                pressDivGame(divGame, dealCarrito);

                divGames.append(divGame)
            })
            quitarLoader("games")
        })
        .fail(error => {
            console.log(error)
            quitarLoader("games")
        })
}

const pressDivGame = (divGame, dealCarrito) => {
    divGame.addEventListener("click", (e) => {
        if (e.target.tagName != "A" && e.target.tagName != "I" && e.target.className != "icon-store") {
            const articulo = $(".ofertas-por-tienda").parent();

            if (articulo.length == 0) {
                mostrarOfertas(divGame.id, dealCarrito);
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

const pressAddToCart = (i, dealCarrito) => {
    i.addEventListener("click", () => {
        dealCarrito.storeIcon = i.parentNode.childNodes[0].childNodes[0].src;
        dealCarrito.dealID = i.parentNode.id;
        dealCarrito.price = parseFloat(i.parentNode.childNodes[1].childNodes[0].innerText.split("$")[1]);
        dealCarrito.redirect = i.parentNode.childNodes[0].href;
        dealCarrito.count = 1;
        if (typeof (Storage) !== 'undefined') {
            let carrito = JSON.parse(localStorage.getItem("carrito") || "[]")
            if (carrito.length) {
                carrito.forEach(oferta => {
                    if (oferta.dealID == dealCarrito.dealID) {
                        oferta.count++;
                    } else {
                        carrito.push(dealCarrito);
                    }
                })
            } else {
                carrito.push(dealCarrito);
            }

            localStorage.setItem("carrito", JSON.stringify(carrito))
        } else {
            let carrito = JSON.parse(sessionStorage.getItem("carrito") || "[]")
            carrito.push(dealCarrito);
            sessionStorage.setItem("carrito", JSON.stringify(carrito))
        }
    })
}

const mostrarOfertas = (gameID, dealCarrito) => {
    const divOfertas = document.createElement("div");
    divOfertas.className = "ofertas-por-tienda";
    divOfertas.style.display = "none";
    getDealsByGameID(gameID)
        .done(res => {
            res.deals.forEach(deal => {
                const divLine = document.createElement("div");
                divLine.className = "line-deal";
                divLine.setAttribute("id", deal.dealID);

                const a = document.createElement("a");
                let icon = document.createElement("img");
                icon.className = "icon-store";
                a.href = redirectToDeal + deal.dealID;
                a.target = "_blank";
                getStores().done(data => {
                    let store = data.filter(store => store.storeID == deal.storeID)[0];
                    icon.src = urlLogos + store.images.icon;
                    // spanTienda.innerText = store.storeName;
                })

                a.append(icon)

                const i = document.createElement("i");
                i.className = "fas fa-cart-plus";
                pressAddToCart(i, dealCarrito);

                const precio = document.createElement("div");
                const spanPrecio = document.createElement("span");
                spanPrecio.innerText = "$" + deal.price;
                precio.append(spanPrecio);

                divLine.append(a, precio, i);

                divOfertas.append(divLine);
            })

            const divLine = document.createElement("div");
            divLine.className = "cheapest-price-ever"
            const span = document.createElement("span");
            let fecha = new Date(res.cheapestPriceEver.date);
            span.innerText = "Precio más bajo: $" + res.cheapestPriceEver.price + " el " + fecha.getDate() + " de " + fecha.toLocaleString('default', { month: 'long' });
            divLine.append(span);
            divOfertas.append(divLine);


            document.getElementById(gameID).append(divOfertas);
            $(".ofertas-por-tienda").show(400);
        })
        .fail(error => {
            console.log(error)
        })
}