export const mostrarLoader = (classPadre) => {
    const divPadre = document.querySelector("." + classPadre)
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

export const quitarLoader = (classPadre) => {
    const divPadre = document.querySelector("." + classPadre)
    const divLoader = document.getElementById("divLoader")
    if (divLoader) {
        divPadre.removeChild(divLoader)
    }
}