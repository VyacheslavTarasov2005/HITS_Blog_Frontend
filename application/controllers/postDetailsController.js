import postsService from "/domain/services/postsService.js";
import addressesService from "/domain/services/addressesService.js";
import likeController from "./likeController.js";
import dateConverter from "../converters/dateConverter.js";
import commentsService from "/domain/services/commentsService.js";
import createCommentRequest from "/data/DTOs/createCommentRequest.js";
import DateConverter from "../converters/dateConverter.js";
import deleteCommentButtonController from "./deleteCommentButtonController.js";
import editCommentButtonController from "./editCommentButtonController.js";
import replyButtonController from "./replyButtonController.js";

const postDetailsController = async (context) => {
    try {
        const details = await postsService.getPostById(window.location.pathname.split("/")[2]);

        document.title = details.title;

        context.id = details.id;

        const postContent = context.querySelector(".post");

        const author = postContent.querySelector(".author");
        author.textContent = details.author;
        author.textContent += ` - ${dateConverter.convertFrom(details.createTime, true)}`;
        if (details.communityName) {
            author.textContent += ` в сообществе "${details.communityName}"`;
        }

        const title = postContent.querySelector("h1");
        title.textContent = details.title;

        if (details.image) {
            const image = postContent.querySelector("img");
            image.src = details.image;
            image.classList.remove("template");
        }

        const body = postContent.querySelector(".body");
        body.textContent = details.description;

        const tags = postContent.querySelector(".tags");
        details.tags.forEach(tag => {
            const tagTemplate = tags.children[0].cloneNode(true);
            tagTemplate.textContent = `#${tag.name} `;
            tagTemplate.classList.remove("template");
            tags.appendChild(tagTemplate);
        });

        const readTime = postContent.querySelector(".read-time");
        readTime.textContent = `Время чтения: ${details.readingTime} минут`;

        if (details.addressId) {
            const geolocation = postContent.querySelector(".geolocation");
            const address = geolocation.querySelector(".address");
            address.textContent = await addressesService.getFullAddressById(details.addressId);
            geolocation.classList.remove("template");
        }

        const commentsQuantity = postContent.querySelector(".subcontainer .comments-quantity .quantity");
        commentsQuantity.textContent = details.commentsCount;

        const likeContainer = postContent.querySelector(".subcontainer .like");

        const likesQuantity = likeContainer.querySelector(".quantity");
        likesQuantity.textContent = details.likes;

        const likeIcon = likeContainer.querySelector("svg");
        if (details.hasLike) {
            likeIcon.classList.add("liked");
        }

        await likeController(details.id);

        if (details.commentsCount > 0) {
            const noComments = context.querySelector(".comments-block .no-comments");
            noComments.classList.add("template");

            const commentContainer = context.querySelector(".comments");
            commentContainer.classList.remove("template");

            if (window.showComments) {
                commentContainer.scrollIntoView({
                    behavior: "smooth",
                });

                delete window.showComments;
            }

            for (const comment of details.comments) {
                const commentTemplate = commentContainer.children[0].cloneNode(true);
                commentTemplate.id = comment.id;

                const author = commentTemplate.querySelector(".author")
                author.textContent = comment.author;

                const text = commentTemplate.querySelector(".text")
                text.textContent = comment.content;

                if (comment.modifiedDate) {
                    const modified = commentTemplate.querySelector(".modified");
                    modified.classList.remove("template");
                    modified.dataset.modifiedDate = dateConverter.convertFrom(comment.modifiedDate, true);
                }

                const date = commentTemplate.querySelector(".date");
                date.textContent = dateConverter.convertFrom(comment.createTime, true);

                if (comment.subComments) {
                    const showRepliesButton = commentTemplate.querySelector(".show-replies");

                    showRepliesButton.addEventListener("click", async () => {
                        try {
                            showRepliesButton.classList.add("template");
                            const replies = await commentsService.getReplies(comment.id);

                            const repliesBlock = commentTemplate.querySelector(".replies");
                            repliesBlock.classList.remove("template");

                            for (const reply of replies) {
                               const replyTemplate =  repliesBlock.children[0].cloneNode(true);

                               replyTemplate.id = reply.id;

                               const author = replyTemplate.querySelector(".author");
                               const text = replyTemplate.querySelector(".text");

                               if (reply.deleteDate) {
                                   author.textContent = "[Комментарий удален]"
                                   author.classList.add("deleted");
                                   author.dataset.deleteDate = dateConverter.convertFrom(comment.deleteDate,
                                       true)

                                   text.textContent = "[Комментарий удален]"
                                   text.classList.add("deleted");
                                   text.dataset.deleteDate = dateConverter.convertFrom(comment.deleteDate,
                                       true)
                               }
                               else {
                                   author.textContent = reply.author;

                                   if (reply.isMine) {
                                       const editButton = replyTemplate.querySelector(".edit");
                                       editButton.classList.remove("template");
                                       await editCommentButtonController(replyTemplate);

                                       const deleteButton = replyTemplate.querySelector(".delete");
                                       deleteButton.classList.remove("template");
                                       await deleteCommentButtonController(replyTemplate);
                                   }

                                   text.textContent = reply.content;

                                   if (comment.modifiedDate) {
                                       const modified = replyTemplate.querySelector(".modified");
                                       modified.classList.remove("template");
                                       modified.dataset.modifiedDate = dateConverter.convertFrom(comment.modifiedDate,
                                           true);
                                   }
                               }

                                const date = replyTemplate.querySelector(".date");
                                date.textContent = DateConverter.convertFrom(reply.createTime, true);

                                replyTemplate.classList.remove("template");

                                repliesBlock.appendChild(replyTemplate);

                                await replyButtonController(replyTemplate, details.id);
                            }
                        }
                        catch (error) {
                            alert("Не удалось загрузить ответы");
                            console.error(error);
                        }
                    });

                    showRepliesButton.classList.remove("template");
                }

                commentTemplate.classList.remove("template");

                commentContainer.appendChild(commentTemplate);

                if (comment.authorId === localStorage.getItem("userId")) {
                    const editButton = commentTemplate.querySelector(".edit");
                    editButton.classList.remove("template");
                    await editCommentButtonController(commentTemplate);

                    const deleteButton = commentTemplate.querySelector(".delete");
                    deleteButton.classList.remove("template");
                    await deleteCommentButtonController(commentTemplate);
                }

                await replyButtonController(commentTemplate, details.id);
            }
        }

        const creteCommentForm = context.querySelector(".create-comment-block form");

        creteCommentForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const commentText = creteCommentForm.querySelector("textarea");

            if (commentText.value) {
                try {
                    const request = new createCommentRequest(commentText.value, null);
                    await commentsService.createComment(details.id, request);
                }
                catch (error) {
                    alert("Не удалось создать комментарий");
                    console.error(error);
                }
            }
        })
    }
    catch (error) {
        alert("Не удалось загрузить пост");
        console.error(error);
    }
}

export default postDetailsController;