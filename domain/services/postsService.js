import api from "/data/api.js";

const createPost = async (request) => {
    const response = await api.post("/post", request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

const getPosts = async () => {
    const response = await api.get("/post", undefined, new URLSearchParams(window.location.search));

    if (response.status === 200) {
        return response.body;
    }
    else {
        throw new Error(response.statusText);
    }
}

const likePost = async (postId) => {
    const response = await api.post(`/post/${postId}/like`);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

const dislikePost = async (postId) => {
    const response = await api.delete(`/post/${postId}/like`);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

export default {
    createPost,
    getPosts,
    likePost,
    dislikePost
};