import api from "/data/api.js";

const getTags = async () => {
    const response = await api.get("/tag");

    if (response.status === 200) {
        return response.body;
    }
    else {
        throw new Error(response.statusText);
    }
}

export default {getTags};