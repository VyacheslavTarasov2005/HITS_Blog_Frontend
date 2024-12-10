import commentsService from "/application/services/commentsService.js";
import editCommentButtonController from "./editCommentButtonController.js";
import deleteCommentButtonController from "./deleteCommentButtonController.js";
import replyButtonController from "./replyButtonController.js";

const repliesController = async (rootComment, postId) => {
    const showRepliesButton = rootComment.querySelector(".show-replies");
    showRepliesButton.classList.add("template");

    const repliesBlock = rootComment.querySelector(".replies");
    repliesBlock.classList.remove("template");

    try {
        const replies = await commentsService.getReplies(rootComment.id);

        while (repliesBlock.children.length > 1) {
            repliesBlock.lastChild.remove();
        }

        repliesBlock.classList.remove("template");

        for (const reply of replies) {
            const replyTemplate =  repliesBlock.children[0].cloneNode(true);

            replyTemplate.id = reply.id;

            const author = replyTemplate.querySelector(".author");
            const text = replyTemplate.querySelector(".text");

            if (reply.deleteDate) {
                author.textContent = "[Комментарий удален]"
                author.classList.add("deleted");
                author.dataset.deleteDate = reply.deleteDate;

                text.textContent = "[Комментарий удален]"
                text.classList.add("deleted");
                text.dataset.deleteDate = reply.deleteDate;
            }
            else {
                author.textContent = reply.author;

                if (reply.isMine) {
                    const editButton = replyTemplate.querySelector(".edit");
                    editButton.classList.remove("template");
                    await editCommentButtonController(replyTemplate, postId, rootComment);

                    const deleteButton = replyTemplate.querySelector(".delete");
                    deleteButton.classList.remove("template");
                    await deleteCommentButtonController(replyTemplate, postId, rootComment);
                }

                text.textContent = reply.content;

                if (reply.modifiedDate) {
                    const modified = replyTemplate.querySelector(".modified");
                    modified.classList.remove("template");
                    modified.dataset.modifiedDate = reply.modifiedDate;
                }
            }

            const date = replyTemplate.querySelector(".date");
            date.textContent = reply.createTime;

            replyTemplate.classList.remove("template");

            repliesBlock.appendChild(replyTemplate);

            await replyButtonController(replyTemplate, postId, rootComment.id);
        }
    }
    catch (error) {
        alert("Не удалось загрузить ответы");
        console.error(error);
    }
}

export default repliesController;