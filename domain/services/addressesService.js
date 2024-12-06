import api from '/data/api.js';

const getAddressByParentIdAndNamePart = async (parentId = null, namePart = null) => {
    const queryParams = new URLSearchParams();

    if (parentId !== null) {
        queryParams.set('parentObjectId', parentId);
    }

    if (namePart !== null) {
        queryParams.set('query', namePart);
    }

    const response = await api.get("/address/search", undefined, queryParams);

    if (response.status === 200) {
        return response.body;
    }
    else {
        throw new Error(response.statusText);
    }
}

export default {
    getAddressByParentIdAndNamePart
}