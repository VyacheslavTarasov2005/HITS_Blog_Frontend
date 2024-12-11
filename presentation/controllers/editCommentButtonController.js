import commentsService from "/application/services/commentsService.js";
import editCommentRequest from "/data/DTOs/editCommentRequest.js";
import repliesController from "./repliesController.js";
import commentsController from "./commentsController.js";
import authChecker from "/application/authChecker.js";

const editCommentButtonController = async (comment, postId, rootComment = null) => {
    const commentContent = comment.querySelector(".content");

    const editCommentBlock = comment.querySelector(".edit-comment");

    const form = editCommentBlock.querySelector("form");

    const commentText = commentContent.querySelector(".text")
    const textInput = form.querySelector("input");

    const editButton = comment.querySelector(".edit");

    editButton.addEventListener("click", async () => {
        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        const commentContent = comment.querySelector(".content");
        commentContent.classList.add("template");

        textInput.value = commentText.textContent;

        editCommentBlock.classList.remove("template");
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const request = new editCommentRequest(textInput.value);

        try {
            await commentsService.editComment(comment.id, request);

            if (rootComment) {
                await repliesController(rootComment, postId);
            }
            else {
                await commentsController(postId);
            }
        }
        catch (error) {
            alert(error.message);
        }
    });
}

export default editCommentButtonController;