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

    const fin = pageActual >= lastPage;

    const li1 = document.createElement("li");
    const a1 = document.createElement("a");
    a1.className = "active";

    a1.setAttribute("href", newHREF(pageActual))
    a1.innerHTML = pageActual;
    li1.append(a1);

    const li2 = document.createElement("li");
    const a2 = document.createElement("a");
    let a2Page = fin ? pageActual - 1 : pageActual + 1;
    a2.setAttribute("href", newHREF(a2Page))
    a2.innerHTML = a2Page;
    li2.append(a2);

    const li3 = document.createElement("li");
    const a3 = document.createElement("a");
    let a3Page = fin ? pageActual - 2 : pageActual + 2;
    a3.setAttribute("href", newHREF(a3Page))
    a3.innerHTML = a3Page;
    li3.append(a3);

    const li4 = document.createElement("li");
    const span = document.createElement("span")
    span.innerHTML = "...";
    li4.append(span);

    const li5 = document.createElement("li");
    const a5 = document.createElement("a");
    let a5Page = fin ? 1 : lastPage;
    a5.setAttribute("href", newHREF(a5Page))
    a5.innerHTML = a5Page;
    li5.append(a5);

    fin ? ul.append(li5, li2, li3, li4, li1) : ul.append(li1, li2, li3, li4, li5)

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