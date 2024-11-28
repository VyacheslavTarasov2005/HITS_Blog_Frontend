import tokenService from './tokenService.js';

const API_URL = 'https://blog.kreosoft.space/api';

const request = async (url, method, body = null, auth = false) => {
    url = API_URL + url;

    const headers = {"content-type": "application/json"};
    if (auth) {
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
    post: (url, body, auth) => request(url, "POST", body, auth),
    get: (url, body, auth) => request(url, "GET", body, auth),
    put: (url, body, auth) => request(url, "PUT", body, auth),
    delete: (url, body, auth) => request(url, "DELETE", body, auth)
}