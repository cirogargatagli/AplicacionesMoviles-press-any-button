import { getDeals } from "../api/apiPages.js";
import { mostrarLoader, quitarLoader } from "../components/loader.js";
import { createPagination } from "../components/pagination.js";

const main = document.querySelector("main");

export const mainDeals = (arrayQuerys) => {
    const section = document.createElement("section");
    section.className = "section";
    const ofertas = document.createElement("div");
    ofertas.className = "ofertas";
    ofertas.setAttribute("id", "ofertas")
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Ofertas"

    const divOptions = createFilterAndSort();


    section.append(titulo, divOptions, ofertas)
    main.append(section)
    changeValueSelect();
    onChangeSort();
    changeCheckFilter();
    onChangeFilter();

    createDeals(arrayQuerys);
}

const changeValueSelect = () => {
    let querys = location.hash.split("&");
    let querySort = querys.filter(a => a.includes("sort"))
    if (querySort.length) {
        let valueSort = querySort[0].split("=")[1]
        document.getElementById('sort').value = valueSort;
    }

}

const changeCheckFilter = () => {
    const checks = document.querySelectorAll(".checkbox")
    checks.forEach(check => {
        if (location.hash.includes(check.name)) {
            check.checked = true;
        } else {
            check.checked = false;
        }
    })
}

const onChangeFilter = () => {
    const checks = document.querySelectorAll(".checkbox");
    checks.forEach(check => {
        check.addEventListener("click", () => {
            if (check.checked) {
                location.hash += check.name;
            } else {
                if (location.hash.includes(check.name)) {
                    location.hash = location.hash.replace(check.name, "")
                }
            }
        })
    })
}

const onChangeSort = () => {
    const selectSort = document.getElementById("sort");
    selectSort.addEventListener("change", (e) => {
        let querys = location.hash.split("&");
        let querySort = querys.filter(a => a.includes("sort"))
        if (querySort.length) {
            location.hash = location.hash.replace(querySort[0], "sortBy=" + e.target.value)
        } else {
            location.hash += "&sortBy=" + e.target.value;
        }
    })
}

const createFilterAndSort = () => {
    const divOptions = document.createElement("div");
    divOptions.className = "options";

    const divFilter = document.createElement("div");
    divFilter.className = "filter";
    divFilter.innerHTML = `
    <div class="titulo-filtros">
        <div>
            <span class="span-filtros">Filtros</span>
        </div>
        <div>
            <i class="fas fa-chevron-down"></i> 
        </div>
    </div>
    <div class="filtros">
        <label>
            <input type="checkbox" class="checkbox" name="&AAA=1">
            AAA
        </label>
        <br>
        <label>
            <input type="checkbox" class="checkbox" name="&onSale=1">
            En venta            
        </label>
        <br>
        <label>
            <input type="checkbox" class="checkbox" name="&UpperPrice=50">
            Hasta $50
        </label>
        <br>
        <label>
            <input type="checkbox" class="checkbox" name="&lowerPrice=50">
            Desde $50
        </label>
    </div>
    `

    divFilter.childNodes[1].addEventListener("click", () => {
        const filtros = $(".filtros");
        if (filtros.css("display") == "none") {
            filtros.slideDown();
            $(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up")
        } else {
            filtros.slideUp();
            $(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down")
        }
    })

    const divSortBy = document.createElement("div");
    divSortBy.className = "order-by";
    divSortBy.innerHTML = `
    <h5>Ordenar por: </h5>
    <select name="sort" id="sort">
    <option value="Deal%20Rating">Valoración</option>
    <option value="Title">Nombre</option>
    <option value="Store">Tienda</option>
    <option value="recent">Más reciente</option>
    <option value="Price">Precio</option>
    </select>
    `

    divOptions.append(divFilter, divSortBy);
    return divOptions;
}

const createDeals = (arrayQuerys) => {

    let query = "";
    let page = "";

    arrayQuerys.forEach((q, index) => {
        if (q.clave == "pageNumber") {
            page = q.valor;
            query += q.clave + "=" + (parseInt(q.valor) - 1);
        } else {
            query += q.clave + "=" + q.valor;
        }
        if (arrayQuerys.length - 1 != index) {
            query += "&"
        }
    })

    const divOfertas = document.getElementById("ofertas")
    mostrarLoader("ofertas");
    getDeals(query)
        .done((data, textStatus, request) => {
            data.forEach(deal => {
                let img = document.createElement("img");
                img.src = deal.thumb;

                let divDeal = document.createElement("article");
                divDeal.className = "oferta"
                divDeal.setAttribute("id", deal.dealID)
                divDeal.setAttribute("name", deal.title)
                divDeal.append(img)
                divOfertas.append(divDeal)
            })
            createPagination(page, parseInt(request.getResponseHeader('x-total-page-count')) + 1);
            quitarLoader("ofertas")
        })
        .fail(() => {
            alert("error")
            quitarLoader("ofertas")
        })
}