import commentsService from "/domain/services/commentsService.js";
import editCommentRequest from "/data/DTOs/editCommentRequest.js";

const editCommentButtonController = async (comment) => {
    const commentContent = comment.querySelector(".content");

    const editCommentBlock = comment.querySelector(".edit-comment");

    const form = editCommentBlock.querySelector("form");

    const commentText = commentContent.querySelector(".text")
    const textInput = form.querySelector("input");

    const editButton = comment.querySelector(".edit");

    editButton.addEventListener("click", async () => {
        const commentContent = comment.querySelector(".content");
        commentContent.classList.add("template");

        textInput.value = commentText.textContent;

        editCommentBlock.classList.remove("template");
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (textInput.value === "") {
            return;
        }

        const request = new editCommentRequest(textInput.value);

        try {
            await commentsService.editComment(comment.id, request);

            commentText.textContent = textInput.value;

            editCommentBlock.classList.add("template");
            commentContent.classList.remove("template");
        }
        catch (error) {
            alert("Не удалось изменить комментарий");
            console.error(error);
        }
    });
}

export default editCommentButtonController;