import postsService from "/application/services/postsService.js";
import authChecker from "/application/authChecker.js";

let isLoading = false

const likeController = async (postId) => {
    const post = document.getElementById(postId);

    if (!post) {
        return;
    }

    const likeContainer = post.querySelector('.like');

    const likesQuantity = likeContainer.querySelector('.quantity');

    const likeButton = likeContainer.querySelector('button');
    const likeIcon = likeButton.querySelector('svg');

    likeButton.addEventListener("click", async () => {
        if (isLoading) {
            return;
        }

        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        isLoading = true;

        try {
            if (!likeIcon.classList.contains("liked")) {
                await postsService.likePost(postId);
                likeIcon.classList.add("liked");
                likesQuantity.textContent = (Number(likesQuantity.textContent) + 1).toString();
            } else {
                await postsService.dislikePost(postId);
                likeIcon.classList.remove("liked");
                likesQuantity.textContent = (Number(likesQuantity.textContent) - 1).toString();
            }
        } catch (error) {
            alert(error.message);
        } finally {
            isLoading = false;
        }
    });
}

export default likeController;