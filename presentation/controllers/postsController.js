import postsService from "/application/services/postsService.js";
import communitiesService from "/application/services/communitiesService.js";
import likeController from "./likeController.js";
import dateConverter from "/application/converters/dateConverter.js";
import readFullHandler from "/presentation/handlers/readFullHandler.js";
import paginationController from "./paginationController.js";

let isLoading = false;

const postsController = async () => {
    if (isLoading) {
        return;
    }

    isLoading = true;

    try {
        const postsBlock = document.querySelector(".posts");

        while (postsBlock.children.length > 1) {
            postsBlock.removeChild(postsBlock.lastChild);
        }

        let posts;
        let specifiedCommunity = false;

        if (window.location.pathname.includes("/communities")) {
            posts = await communitiesService.getCommunityPosts(window.location.pathname.split("/")[2]);
            specifiedCommunity = true;
        } else {
            posts = await postsService.getPosts();
        }

        await paginationController(posts.pagination);

        for (const post of posts.posts) {
            const postTemplate = postsBlock.children[0].cloneNode(true);

            postTemplate.id = post.id;

            const postContent = postTemplate.querySelector(".content");

            const authorBlock = postContent.querySelector(".author");
            authorBlock.textContent = post.author;
            authorBlock.textContent += ` - ${dateConverter.convertFrom(post.createTime, true)}`;

            if (!specifiedCommunity && post.communityName) {
                authorBlock.textContent += ` в сообществе "${post.communityName}"`;
            }

            const titleBlock = postContent.querySelector(".title");
            titleBlock.href = `/post/${post.id}`
            titleBlock.textContent = post.title;

            const imageBlock = postContent.querySelector("img");
            if (post.image) {
                imageBlock.src = post.image;
                imageBlock.style.display = "";
            }

            const postTags = postContent.querySelector(".tags");
            post.tags.forEach(tag => {
                const tagTemplate = postTags.children[0].cloneNode(true);
                tagTemplate.textContent = `#${tag.name} `;
                tagTemplate.style.display = "";
                postTags.appendChild(tagTemplate);
            });

            const readTimeBlock = postContent.querySelector(".read-time");
            readTimeBlock.textContent = `Время чтения: ${post.readingTime} минут`;

            const postSubcontainer = postTemplate.querySelector(".subcontainer");

            const commentsContainer = postTemplate.querySelector(".comments-quantity");

            const commentsIcon = commentsContainer.querySelector(".icon");
            commentsIcon.addEventListener("click", async (event) => {
                event.preventDefault();

                window.showComments = "true";
                await route(`/post/${post.id}`);
            })

            const commentsQuantity = commentsContainer.querySelector(".quantity");
            commentsQuantity.textContent = post.commentsCount;

            const likeContainer = postSubcontainer.querySelector(".like");

            const likesQuantity = likeContainer.querySelector(".quantity");
            likesQuantity.textContent = post.likes;

            const likeIcon = likeContainer.querySelector("svg");
            if (post.hasLike) {
                likeIcon.classList.add("liked");
            }

            postTemplate.style.display = "";
            postsBlock.appendChild(postTemplate);

            const postBody = postContent.querySelector(".body");

            readFullHandler(postBody, post.description);

            await likeController(post.id);
        }
    }
    catch (error) {
        alert("Не удалось загрузить посты");
        console.error(error);
    }
    finally {
        isLoading = false;
    }
}

export default postsController;