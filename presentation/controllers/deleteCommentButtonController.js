import commentsService from "/application/services/commentsService.js";
import repliesController from "./repliesController.js";
import authChecker from "/application/authChecker.js";

const deleteCommentButtonController = async (comment, postId = null, rootComment = null) => {
    const deleteButton = comment.querySelector(".delete");

    deleteButton.addEventListener("click", async () => {
        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

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
            alert(error.message);
        }
    });
}

export default deleteCommentButtonController;