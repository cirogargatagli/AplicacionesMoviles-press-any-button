export const mostrarLoader = (idPadre) => {
    const divPadre = document.querySelector("." + idPadre)
    const divLoader = document.createElement("div");
    divLoader.setAttribute("id", "divLoader");
    divLoader.append(loader())
    divPadre.append(divLoader)
}

const loader = () => {
    const loader = document.createElement("div");
    loader.className = "loader"
    loader.setAttribute("id", "loader")
    return loader;
}

export const quitarLoader = (idPadre) => {
    const divPadre = document.querySelector("." + idPadre)
    const divLoader = document.getElementById("divLoader")
    if (divLoader) {
        divPadre.removeChild(divLoader)
    }

}