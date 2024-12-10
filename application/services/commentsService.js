import api from "/data/api.js";
import commentEntity from "/domain/entities/commentEntity.js";
import DateConverter from "../converters/dateConverter";
import dateConverter from "../converters/dateConverter";

const createComment = async (postId, request) => {
    const response = await api.post(`/post/${postId}/comment`, request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

const getReplies = async (commentId) => {
    const response = await api.get(`/comment/${commentId}/tree`);

    if (response.status === 200) {
        const result = []

        response.body.forEach(reply => {
            const userId = localStorage.getItem("userId");

            const replyResult = new commentEntity(reply.id,
                DateConverter.convertFrom(reply.createTime, true), reply.content,
                reply.modifiedDate ? DateConverter.convertFrom(reply.modifiedDate, true) : null,
                reply.deleteDate ? DateConverter.convertFrom(reply.deleteDate, true) : null,
                reply.author, reply.authorId === userId);

            result.push(replyResult);
        })

        return result;
    }
    else {
        throw new Error(response.statusText);
    }
}

const deleteComment = async (commentId) => {
    const response = await api.delete(`/comment/${commentId}`);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

const editComment = async (commentId, request) => {
    const response = await api.put(`/comment/${commentId}`, request);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

const getRootComments = async (postId) => {
    const response = await api.get(`/post/${postId}`);

    if (response.status === 200) {
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

        return comments;
    }
    else {
        throw new Error(response.statusText);
    }
}

export default {
    createComment,
    getReplies,
    deleteComment,
    editComment,
    getRootComments
}