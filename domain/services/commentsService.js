import api from "/data/api.js";

const createComment = async (postId, request) => {
    const response = await api.post(`/post/${postId}/comment`, request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

export default {
    createComment
}