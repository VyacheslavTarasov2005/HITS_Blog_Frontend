import commentsService from "/application/services/commentsService.js";
import repliesController from "./repliesController.js";

const deleteCommentButtonController = async (comment, postId = null, rootComment = null) => {
    const deleteButton = comment.querySelector(".delete");

    deleteButton.addEventListener("click", async () => {
        try {
            await commentsService.deleteComment(comment.id);
            if (rootComment) {
                await repliesController(rootComment, postId);
            }
            else {
                comment.remove();
            }
        }
        catch (error) {
            alert("Не удалось удалить комментарий");
            console.error(error);
        }
    });
}

export default deleteCommentButtonController;