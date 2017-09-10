import $ from 'jquery';
import {API_KEY, PAGE_SIZE, SEARCH_URL} from '../settings';

export default function search(config) {
    const xhr = $.get(`${SEARCH_URL}${config.query}&api_key=${API_KEY}&offset=${config.currentPage}&limit=${PAGE_SIZE}`);

    xhr.then((response) => {
        config.callback(response);
    });
}
