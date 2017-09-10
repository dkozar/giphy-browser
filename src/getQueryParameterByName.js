export default function getQueryParameterByName(name) {
    name = name.replace(/[[\]]/g, "\\$&");

    const url = window.location.href,
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
