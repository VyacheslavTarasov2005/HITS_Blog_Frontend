import api from "/data/api.js";
import postDetailsEntity from "/domain/entities/postDetailsEntity.js";
import commentEntity from "/domain/entities/commentEntity.js";
import dateConverter from "/application/converters/dateConverter.js";
import addressesService from "./addressesService.js";

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

const getPostById = async (postId) => {
    const response = await api.get(`/post/${postId}`);

    if (response.status === 200) {
        let result;

        let comments = [];
        response.body.comments.forEach((comment) => {
            const userId = localStorage.getItem("userId");

            const commentResult = new commentEntity(comment.id,
                dateConverter.convertFrom(comment.createTime, true), comment.content,
                comment.modifiedDate ? dateConverter.convertFrom(comment.modifiedDate, true) : null,
                comment.deleteDate ? dateConverter.convertFrom(comment.deleteDate, true) : null,
                comment.author, comment.authorId === userId, comment.subComments);

            comments.push(commentResult);
        });

        let address = null;
        if (response.body.addressId) {
            address = await addressesService.getFullAddressById(response.body.addressId);
        }

        result = new postDetailsEntity(response.body.id, dateConverter.convertFrom(response.body.createTime),
            response.body.title, response.body.description, response.body.readingTime, response.body.image,
            response.body.author, response.body.communityName, address, response.body.likes, response.body.hasLike,
            response.body.commentsCount, response.body.tags, comments);

        return result;
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
    getPostById,
    likePost,
    dislikePost
};