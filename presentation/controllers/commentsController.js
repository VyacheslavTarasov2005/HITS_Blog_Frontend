import editCommentButtonController from "./editCommentButtonController.js";
import deleteCommentButtonController from "./deleteCommentButtonController.js";
import replyButtonController from "./replyButtonController.js";
import repliesController from "./repliesController.js";
import commentsService from "/application/services/commentsService.js";

const commentsController = async (postId, comments = null) => {
    const post = document.getElementById(postId);
    const commentsBlock = post.querySelector(".comments-block");

    const noComments = commentsBlock.querySelector('.no-comments');
    noComments.classList.add("template");

    const commentsContainer = commentsBlock.querySelector(".comments");
    commentsContainer.classList.remove("template");

    if (window.showComments) {
        commentsContainer.scrollIntoView({
            behavior: "smooth",
        });

        delete window.showComments;
    }

    if (!comments) {
        try {
            comments = await commentsService.getRootComments(postId);

            while (commentsContainer.children.length > 1) {
                commentsContainer.lastChild.remove();
            }
        }
        catch (error) {
            alert(error.message);
        }
    }

    for (const comment of comments) {
        const commentTemplate = commentsContainer.children[0].cloneNode(true);
        commentTemplate.id = comment.id;

        const author = commentTemplate.querySelector(".author")
        author.textContent = comment.author;

        const text = commentTemplate.querySelector(".text")
        text.textContent = comment.content;

        if (comment.modifiedDate) {
            const modified = commentTemplate.querySelector(".modified");
            modified.classList.remove("template");
            modified.dataset.modifiedDate = comment.modifiedDate;
        }

        const date = commentTemplate.querySelector(".date");
        date.textContent = comment.createTime;

        if (comment.subComments) {
            const showRepliesButton = commentTemplate.querySelector(".show-replies");

            showRepliesButton.addEventListener("click", async () => {
                showRepliesButton.classList.add("template");

                await repliesController(commentTemplate, postId);

                showRepliesButton.classList.add("template");
            });

            showRepliesButton.classList.remove("template");
        }

        commentTemplate.classList.remove("template");

        commentsContainer.appendChild(commentTemplate);

        if (comment.isMine) {
            const editButton = commentTemplate.querySelector(".edit");
            editButton.classList.remove("template");
            await editCommentButtonController(commentTemplate, postId);

            const deleteButton = commentTemplate.querySelector(".delete");
            deleteButton.classList.remove("template");
            await deleteCommentButtonController(commentTemplate, postId);
        }

        await replyButtonController(commentTemplate, postId);
    }
}

export default commentsController;