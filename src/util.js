export const getQueryParam = () => {
    let params = (new URL(document.location)).searchParams;
    let res = []
    for (const value of params.values()) {
        res.push(value);
    }
    return res;
}

// https://stackoverflow.com/questions/6566456/how-to-serialize-an-object-into-a-list-of-url-query-parameters
export const generateNominationURL = (nominations) => {
    let params = Object.assign({}, nominations.map(item => item.imdbID));
    const url =  (new URL(document.location))
    url.search = new URLSearchParams(params);
    return url;
}