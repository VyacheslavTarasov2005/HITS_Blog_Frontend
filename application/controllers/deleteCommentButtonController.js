import commentsService from "/domain/services/commentsService.js";

const deleteCommentButtonController = async (comment) => {
    const deleteButton = comment.querySelector(".delete");

    deleteButton.addEventListener("click", async () => {
        try {
            await commentsService.deleteComment(comment.id);
            comment.remove();
        }
        catch (error) {
            alert("Не удалось удалить комментарий");
            console.error(error);
        }
    });
}

export default deleteCommentButtonController;