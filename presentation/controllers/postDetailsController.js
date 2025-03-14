import postsService from "/application/services/postsService.js";
import likeController from "./likeController.js";
import commentsService from "/application/services/commentsService.js";
import createCommentRequest from "/data/DTOs/createCommentRequest.js";
import commentsController from "./commentsController.js";
import authChecker from "/application/authChecker.js";

const postDetailsController = async (context) => {
    try {
        const details = await postsService.getPostById(window.location.pathname.split("/")[2]);

        document.title = details.title;

        context.id = details.id;

        const postContent = context.querySelector(".post");

        const author = postContent.querySelector(".author");
        author.textContent = details.author;
        author.textContent += ` - ${details.createTime}`;
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

        if (details.address) {
            const geolocation = postContent.querySelector(".geolocation");
            const address = geolocation.querySelector(".address");
            address.textContent = details.address;
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
            await commentsController(details.id, details.comments);
        }

        const creteCommentForm = context.querySelector(".create-comment-block form");

        creteCommentForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!authChecker()) {
                alert("Необходимо войти в аккаунт");
                return;
            }

            const commentText = creteCommentForm.querySelector("textarea");

            const request = new createCommentRequest(commentText.value, null);
            try {
                await commentsService.createComment(details.id, request);
                await commentsController(details.id);
                commentText.value = '';
            }
            catch (error) {
                alert(error.message);
            }
        });
    }
    catch (error) {
        alert(error.message);
    }
}

export default postDetailsController;