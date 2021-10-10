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
    let ofertasAgregadas = [];
    if (typeof (Storage) !== 'undefined') {
        ofertasAgregadas = JSON.parse(localStorage.getItem("carrito"));
    } else {
        ofertasAgregadas = JSON.parse(sessionStorage.getItem("carrito"));
    }
    if (ofertasAgregadas) {
        mostrarAgregadosAlCarrito(ofertasAgregadas);
    } else {
        let divOfertasAgregadas = document.querySelector(".ofertas");
        let h4 = document.createElement("h4");
        h4.innerText = "No agregaste ningún elemento al carro."
        divOfertasAgregadas.append(h4)
    }
}

const mostrarAgregadosAlCarrito = (ofertasAgregadas) => {
    const divGames = document.querySelector(".ofertas");

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



        let spanCantidad = document.createElement("span");
        spanCantidad.className = "span-cantidad";
        spanCantidad.innerText = oferta.count;

        divDetalle.append(divStore, divTexto, spanCantidad);
        cantidadGastos += oferta.price * oferta.count;
        let divGame = document.createElement("article");
        divGame.className = "game"
        divGame.setAttribute("id", oferta.dealID)
        divGame.setAttribute("name", oferta.title)
        divGame.append(img, divDetalle)

        divGames.append(divGame)
    })
    let gastos = document.getElementById("gastos");

    gastos.innerText = "Total: $ " + cantidadGastos.toFixed(2);
}