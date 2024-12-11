import api from "/data/api.js";
import commentEntity from "/domain/entities/commentEntity.js";
import DateConverter from "../converters/dateConverter.js";
import dateConverter from "../converters/dateConverter.js";

const createComment = async (postId, request) => {
    const response = await api.post(`/post/${postId}/comment`, request);

    if (response.status !== 200) {
        if (response.status === 401) {
            throw new Error("Не удалось создать комментарий, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 403) {
            throw new Error("Вы не можете писать комментарии к этому посту");
        }

        if (response.status === 404) {
            throw new Error("Пост не найден");
        }

        throw new Error("Не удалось написать комментарий");
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
        if (response.status === 404) {
            throw new Error("Комментарий не найден");
        }

        throw new Error("Не удалось получить ответы к комментарию");
    }
}

const deleteComment = async (commentId) => {
    const response = await api.delete(`/comment/${commentId}`);

    if (response.status !== 200) {
        if (response.status === 401) {
            throw new Error("Не удалось удалить комментарий, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 403) {
            throw new Error("Вы не можете удалить этот комментарий");
        }

        if (response.status === 404) {
            throw new Error("Комментарий не найден");
        }

        throw new Error("Не удалось удалить комментарий");
    }
}

const editComment = async (commentId, request) => {
    const response = await api.put(`/comment/${commentId}`, request);

    if (response.status !== 200) {
        if (response.status === 401) {
            throw new Error("Не удалось изменить комментарий, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 403) {
            throw new Error("Вы не можете изменить этот комментарий");
        }

        if (response.status === 404) {
            throw new Error("Комментарий не найден");
        }

        throw new Error("Не удалось изменить комментарий");
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
        if (response.status === 401) {
            throw new Error("Не удалось загрузить комментарии, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 403) {
            throw new Error("Вы не можете получить комментарии к этому посту");
        }

        if (response.status === 404) {
            throw new Error("Пост не найден");
        }

        throw new Error("Не удалось загрузить комментарии");
    }
}

export default {
    createComment,
    getReplies,
    deleteComment,
    editComment,
    getRootComments
}