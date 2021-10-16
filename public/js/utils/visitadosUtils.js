export const addVisitado = (ofertaVisitada) => {
    if (typeof (Storage) !== 'undefined') {
        let visitados = JSON.parse(localStorage.getItem("visitados") || "[]");
        let indexOfOferta = visitados.findIndex(i => i.dealID == ofertaVisitada.dealID);
        switch (indexOfOferta) {
            case -1:
                visitados.unshift(ofertaVisitada);
                break;
            case 0:
                break;
            case 1:
                visitados.splice(0, 0, visitados.splice(1, 1)[0])
                break;
            case 2:
                visitados.splice(0, 0, visitados.splice(2, 1)[0])
                break;
            default:
                visitados.splice(indexOfOferta, 1);
                visitados.unshift(ofertaVisitada);
                break;
        }
        localStorage.setItem("visitados", JSON.stringify(visitados))
    }
}