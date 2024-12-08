import createCommentRequest from "/data/DTOs/createCommentRequest.js";
import commentsService from "/domain/services/commentsService.js";

const replyButtonController = async (comment, postId) => {
    const replyButton = comment.querySelector(".reply-button");
    const replyBlock = comment.querySelector(".write-reply");

    replyButton.addEventListener("click", async () => {
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
        }
        catch (error) {
            alert("Не удалось создать ответ");
            console.error(error);
        }
    });
}

export default replyButtonController;