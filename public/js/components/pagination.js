import { getQuerys } from "../utils/querysURLUtils.js";


export const createPagination = (pageActual, lastPage) => {
    const section = document.querySelector("section");

    let ul = sortPagination(pageActual, lastPage);
    section.append(ul)
}

const sortPagination = (pageActualString, lastPage) => {
    let pageActual = parseInt(pageActualString)
    const ul = document.createElement("ul");
    ul.className = "pagination";

    const inicio = pageActual == 1;
    const fin = pageActual >= lastPage;
    const diferencia = lastPage - pageActual;

    const liAnterior = document.createElement("li");
    const aAnterior = document.createElement("a");
    aAnterior.setAttribute("href", newHREF(pageActual - 1));
    aAnterior.innerHTML = "<";
    liAnterior.append(aAnterior);
    inicio ? liAnterior.style.display = "none" : liAnterior.style.display = "inline"

    const liInicio = document.createElement("li");
    const a = document.createElement("a");
    a.setAttribute("href", newHREF(1));
    a.innerHTML = 1;
    liInicio.append(a);

    const liSpanInicio = document.createElement("li");
    const spanInicio = document.createElement("span");
    spanInicio.className = "spanPuntos";
    spanInicio.innerHTML = "...";
    liSpanInicio.append(spanInicio);
    pageActual > 3 ? liSpanInicio.style.display = "inline" : liSpanInicio.style.display = "none";

    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    let a1Page = pageActual - 1;
    a1.setAttribute("href", newHREF(a1Page))
    a1.innerHTML = a1Page;
    li1.append(a1);
    pageActual <= 2 ? li1.style.display = "none" : li1.style.display = "inline"

    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    a2.setAttribute("href", newHREF(pageActual))
    a2.innerHTML = pageActual;
    li2.append(a2);
    inicio ? li2.style.display = "none" : li2.style.display = "inline"

    if (inicio) {
        a.className = 'active';
        li1.style.display = 'none';
    } else {
        a2.className = 'active';
    }

    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    let a3Page = fin ? pageActual - 1 : pageActual + 1;
    a3.setAttribute("href", newHREF(a3Page))
    a3.innerHTML = a3Page;
    li3.append(a3);

    const liSpanFinal = document.createElement("li");
    const spanFinal = document.createElement("span");
    spanFinal.className = "spanPuntos";
    spanFinal.innerHTML = "...";
    liSpanFinal.append(spanFinal);
    fin ? liSpanFinal.style.display = "none" : liSpanFinal.style.display = "inline";

    const li4 = document.createElement("li");
    const a4 = document.createElement("a");
    let a4Page = fin ? 1 : lastPage;
    a4.setAttribute("href", newHREF(a4Page))
    a4.innerHTML = a4Page;
    li4.append(a4);

    if (!fin && diferencia == 1) {
        li3.style.display = "none";
        liSpanFinal.style.display = "none";
    }

    if (!fin && diferencia == 2) {
        liSpanFinal.style.display = "none";
    }

    const liSiguiente = document.createElement("li");
    const aSiguiente = document.createElement("a");
    aSiguiente.setAttribute("href", newHREF(pageActual + 1));
    aSiguiente.innerHTML = ">";
    liSiguiente.append(aSiguiente);
    fin ? liSiguiente.style.display = "none" : liSiguiente.style.display = "inline"

    fin
        ? ul.append(liAnterior, li4, liSpanInicio, li3, li2)
        : ul.append(liAnterior, liInicio, liSpanInicio, li1, li2, li3, liSpanFinal, li4, liSiguiente)

    return ul;
}


const newHREF = (newPage) => {
    let querys = location.hash.split("?")[1].split("&");
    let arrayQuerys = getQuerys();

    let pageAModificar = "";

    arrayQuerys.forEach(q => {
        if (q.clave == "pageNumber") {
            pageAModificar = q.clave + "=" + q.valor;
        }
    })

    let pageModificada = "pageNumber=" + newPage
    return location.hash.replace(pageAModificar, pageModificada)
}