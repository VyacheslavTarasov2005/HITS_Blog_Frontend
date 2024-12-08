import api from "/data/api.js";
import commentReplyEntity from "../entities/commentReplyEntity.js";

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

            const replyResult = new commentReplyEntity(reply.id, reply.createTime, reply.content,
                reply.modifiedDate, reply.deleteDate, reply.author, reply.authorId === userId);

            result.push(replyResult);
        })

        return result;
    }
    else {
        throw new Error(response.statusText);
    }
}

export default {
    createComment,
    getReplies
}