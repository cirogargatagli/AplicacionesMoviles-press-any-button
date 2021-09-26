import { createMap } from "../components/mapa.js";

const main = document.querySelector("main")

export const mainContact = () => {
    const section = document.createElement("section");
    section.className = "section";
    const map = document.createElement("div");
    map.className = "map";
    map.setAttribute("id", "map")
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Contacto"
    section.append(titulo, map)
    main.append(section)

    createMap();
}