export default class WindowUtil {}

WindowUtil.getQueryParameterByName = (name) => {
    name = name.replace(/[[\]]/g, "\\$&");

    const url = WindowUtil.getWindow().location.href,
        regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

WindowUtil.getWindow = () => {
    return window; // to be mocked in tests
};