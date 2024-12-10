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

const getFullAddressById = async (addressId) => {
    const queryParams = new URLSearchParams();
    queryParams.set('objectGuid', addressId);

    const response = await api.get(`/address/chain`, undefined, queryParams);

    if (response.status === 200) {
        let result = '';

        for (let i = 0; i < response.body.length; i++) {
            result += response.body[i].text;
            if (i !== response.body.length - 1) {
                result += ', ';
            }
        }

        return result;
    }
    else {
        throw new Error(response.statusText);
    }
}

export default {
    getAddressByParentIdAndNamePart,
    getFullAddressById
}