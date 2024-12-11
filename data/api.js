import tokenRepository from './tokenRepository.js';

const API_URL = 'https://blog.kreosoft.space/api';

const request = async (url, method, body = null, query = null) => {
    url = API_URL + url;

    const headers = {"content-type": "application/json"};

    const token = tokenRepository.getToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (query) {
        url += `?${new URLSearchParams(query)}`;
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        })

        return {"status": response.status, "body": await response.json().catch(() => null)};
    }
    catch (error) {
        console.error("Не удалось выполнить запрос", error);
        return {status: 0};
    }
}

export default {
    post: (url, body, query) => request(url, "POST", body, query),
    get: (url, body, query) => request(url, "GET", body, query),
    put: (url, body, query) => request(url, "PUT", body, query),
    delete: (url, body, query) => request(url, "DELETE", body, query)
}