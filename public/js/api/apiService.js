export const getJSON = (endpoint) => {
    return $.getJSON(endpoint);
}

export const get = (endpoint) => {
    return $.ajax({
        method: "GET",
        url: endpoint
    });
}
