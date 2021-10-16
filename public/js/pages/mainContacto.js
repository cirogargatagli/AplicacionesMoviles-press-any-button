import { createMap } from "../components/mapa.js";

const main = document.querySelector("main")

export const mainContact = () => {
    const section = document.createElement("section");
    section.className = "section";

    const contactos = document.createElement("div");
    contactos.setAttribute("class", "contactos");
    
    const contactoCiro = document.createElement("article");
    contactoCiro.setAttribute("class", "contacto-desarrollador");
    const imagenCiro = document.createElement("img");
    imagenCiro.setAttribute("src", "../img/contacto/ciro.jpg");
    imagenCiro.setAttribute("class", "foto");
    const divTextoCiro = document.createElement("div");

    const nombreCiro = document.createElement("p");
    nombreCiro.innerText = "Ciro Gargatagli"
    const puestoCiro = document.createElement("p");
    puestoCiro.innerText = "Developer Full Stack"
    const empresaCiro = document.createElement("p");
    empresaCiro.innerText = "Andreani Grupo Logistico";
    
    divTextoCiro.append(nombreCiro, puestoCiro, empresaCiro);
    
    const divlinkedinCiro = document.createElement("div");
    const iconLinkedinCiro = document.createElement("i");
    iconLinkedinCiro.setAttribute("class", "fab fa-linkedin linkedin-icon");
    const aLinkedinCiro = document.createElement("a");
    aLinkedinCiro.href = "https://linkedin.com/in/ciro-gargatagli";
    aLinkedinCiro.target = "_blank";
    aLinkedinCiro.append(iconLinkedinCiro);

    divlinkedinCiro.append(aLinkedinCiro);
    
    contactoCiro.append(imagenCiro, divTextoCiro, divlinkedinCiro);

    const contactoDamian = document.createElement("article");
    contactoDamian.setAttribute("class", "contacto-desarrollador");
    const imagenDamian = document.createElement("img");
    imagenDamian.setAttribute("src", "../img/contacto/damian.jpg");
    imagenDamian.setAttribute("class", "foto");
    const divTextoDamian = document.createElement("div");
    const nombreDamian = document.createElement("p");
    nombreDamian.innerText = "Damian Djirikian"
    const puestoDamian = document.createElement("p");
    puestoDamian.innerText = "Developer Full Stack"
    const empresaDamian = document.createElement("p");
    empresaDamian.innerText = "Capgemini";

    divTextoDamian.append(nombreDamian, puestoDamian, empresaDamian);

    const divlinkedinDamian = document.createElement("div");
    const iconLinkedinDamian = document.createElement("i");
    iconLinkedinDamian.setAttribute("class", "fab fa-linkedin linkedin-icon");
    const aLinkedinDamian = document.createElement("a");
    aLinkedinDamian.href = "https://linkedin.com/in/damian-djirikian-921171b9";
    aLinkedinDamian.target = "_blank";
    aLinkedinDamian.append(iconLinkedinDamian);

    divlinkedinDamian.append(aLinkedinDamian);

    contactoDamian.append(imagenDamian, divTextoDamian, divlinkedinDamian);

    contactos.append(contactoCiro, contactoDamian);

    const map = document.createElement("div");
    map.className = "map";
    map.setAttribute("id", "map")
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Contacto"
    section.append(titulo, contactos, map)
    main.append(section)

    createMap();
}