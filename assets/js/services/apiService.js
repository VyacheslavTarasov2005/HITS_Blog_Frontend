import tokenService from './tokenService.js';

const API_URL = 'https://blog.kreosoft.space/api';

const request = async (url, method, body = null, isAuthorised = false) => {

    url = API_URL + url;

    const headers = {"content-type": "application/json"};
    if (isAuthorised) {
        const token = tokenService.getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        } else {
            throw new Error("Необходим токен");
        }
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        })

        if (response.ok) {
            return await response.json();
        }

        const error = await response.json();
        throw new Error(error.message);
    }
    catch (error) {
        console.error("Не удалось выполнить запрос", error);
        throw error;
    }
}

export default {
    post: (url, body, isAuthorised) => request(url, "POST", body, isAuthorised),
    get: (url, body, isAuthorised) => request(url, "GET", body, isAuthorised),
    put: (url, body, isAuthorised) => request(url, "PUT", body, isAuthorised),
    delete: (url, body, isAuthorised) => request(url, "DELETE", body, isAuthorised),
}