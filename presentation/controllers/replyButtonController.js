import createCommentRequest from "/data/DTOs/createCommentRequest.js";
import commentsService from "/application/services/commentsService.js";
import repliesController from "./repliesController.js";
import authChecker from "/application/authChecker.js";

const replyButtonController = async (comment, postId, rootCommentId = null) => {
    const replyButton = comment.querySelector(".reply-button");
    const replyBlock = comment.querySelector(".write-reply");

    replyButton.addEventListener("click", async () => {
        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        replyBlock.classList.remove("template");
    });

    const replyForm = replyBlock.querySelector("form");
    replyForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const text = replyForm.querySelector("input");

        const request = new createCommentRequest(text.value, comment.id);

        try {
            await commentsService.createComment(postId, request);
            replyBlock.classList.add("template");
            text.value = "";

            let rootComment;
            if (rootCommentId) {
                rootComment = document.getElementById(rootCommentId);
            }
            else {
                rootComment = comment;
            }

            await repliesController(rootComment, postId);
        }
        catch (error) {
            alert(error.message);
        }
    });
}

export default replyButtonController;