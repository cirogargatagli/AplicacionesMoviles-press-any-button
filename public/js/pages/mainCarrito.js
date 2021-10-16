const main = document.querySelector("main");

export const mainCarrito = () => {
    const section = document.createElement("section");
    section.className = "section";
    const ofertas = document.createElement("div");
    ofertas.className = "ofertas";
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Carrito"
    let gastos = document.createElement("span");
    gastos.setAttribute("id", "gastos")


    section.append(titulo, gastos, ofertas);
    main.append(section)
    createCarrito();
}

const createCarrito = () => {
    if (typeof (Storage) !== 'undefined') {
        let ofertasAgregadas = JSON.parse(localStorage.getItem("carrito"));
        if (ofertasAgregadas && ofertasAgregadas.length) {
            mostrarAgregadosAlCarrito(ofertasAgregadas);
        } else {
            let divOfertasAgregadas = document.querySelector(".ofertas");
            let h4 = document.createElement("h4");
            h4.innerText = "No agregaste ningún elemento al carro."
            divOfertasAgregadas.append(h4)
        }
    }
}

const mostrarAgregadosAlCarrito = (ofertasAgregadas) => {
    const divGames = document.querySelector(".ofertas");
    $(".ofertas").empty();

    let cantidadGastos = 0;
    ofertasAgregadas.forEach(oferta => {

        let img = document.createElement("img");
        img.src = oferta.img;

        let divDetalle = document.createElement("div");
        divDetalle.className = "div-detalle";

        let divStore = document.createElement("div");
        const a = document.createElement("a");
        let iconStore = document.createElement("img");
        iconStore.className = "icon-store";
        a.href = oferta.redirect;
        a.target = "_blank";
        iconStore.src = oferta.storeIcon;
        a.append(iconStore);
        divStore.append(a);

        let divTexto = document.createElement("div");
        divTexto.className = "div-texto";
        const spanTitle = document.createElement("span");
        spanTitle.className = "titulo-juego"
        spanTitle.innerText = oferta.title;

        const spanPrecio = document.createElement("span");
        spanPrecio.className = "precio-bajo-juego"
        spanPrecio.innerText = "$" + oferta.price;

        divTexto.append(spanTitle, spanPrecio);
        divDetalle.append(divStore, divTexto);

        let divCantidad = document.createElement("div");
        divCantidad.className = "div-cantidad"
        let iconMinus = document.createElement("i");
        iconMinus.className = "fas fa-minus-square";
        let spanCantidad = document.createElement("span");
        spanCantidad.className = "span-cantidad";
        spanCantidad.innerText = oferta.count;
        let iconPlus = document.createElement("i");
        iconPlus.className = "fas fa-plus-square";
        divCantidad.append(iconMinus, spanCantidad, iconPlus);

        changeCount(iconMinus, false);
        changeCount(iconPlus);

        let divActions = document.createElement("div");
        divActions.className = "div-actions";
        let iconEliminar = document.createElement("i");
        iconEliminar.className = "fas fa-times-circle";

        iconEliminar.addEventListener("click", () => {
            if (typeof (Storage) !== 'undefined') {
                if (confirm("¿Desea eliminar este artículo del carrito?")) {
                    let ofertas = JSON.parse(localStorage.getItem("carrito"));
                    ofertas = ofertas.filter(oferta => oferta.dealID != iconEliminar.parentNode.parentNode.id);
                    localStorage.setItem("carrito", JSON.stringify(ofertas))
                    mostrarAgregadosAlCarrito(ofertas);
                }
            }
        })

        cantidadGastos += oferta.price * oferta.count;

        divActions.append(divCantidad, iconEliminar);

        let divGame = document.createElement("article");
        divGame.className = "game"
        divGame.setAttribute("id", oferta.dealID)
        divGame.setAttribute("name", oferta.title)
        divGame.append(img, divDetalle, divActions)

        divGames.append(divGame)
    })
    let gastos = document.getElementById("gastos");

    gastos.innerText = "Total: $ " + cantidadGastos.toFixed(2);
}

const changeCount = (icon, add = true) => {
    icon.addEventListener("click", () => {
        let ofertasPlus = JSON.parse(localStorage.getItem("carrito"));
        let cambio = false;
        let newOfertasPlus = ofertasPlus.map(oferta => {
            if (oferta.dealID == icon.parentNode.parentNode.parentNode.id) {
                if (add) {
                    oferta.count++
                    cambio = true;
                } else {
                    if (oferta.count > 0) {
                        oferta.count--
                        cambio = true;
                    }
                }
            }
            return oferta;
        });
        if (cambio) {
            localStorage.setItem("carrito", JSON.stringify(ofertasPlus))
            mostrarAgregadosAlCarrito(ofertasPlus);
        }
    })
}