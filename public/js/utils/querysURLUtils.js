export const getQuerys = () => {
    let localizacion = location.hash.split("#")[1];
    const querys = localizacion.split("?")[1].split("&");
    const arrayQuerys = []
    querys.forEach(query => {
        var pares = query.split("=");
        let objQuery = {
            clave: pares[0],
            valor: pares[1]
        }
        arrayQuerys.push(objQuery)
    })
    return arrayQuerys;
}