import postsService from "/application/services/postsService.js";
import authChecker from "/application/authChecker.js";

const likeController = async (postId) => {
    const post = document.getElementById(postId);

    const likeContainer = post.querySelector('.like');

    const likesQuantity = likeContainer.querySelector('.quantity');

    const likeButton = likeContainer.querySelector('button');
    const likeIcon = likeButton.querySelector('svg');

    likeButton.addEventListener("click", async () => {
        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        if (!likeIcon.classList.contains("liked")) {
            try {
                await postsService.likePost(postId);
                likeIcon.classList.add("liked");
                likesQuantity.textContent = (Number(likesQuantity.textContent) + 1).toString();
            }
            catch (error) {
                alert(error.message);
            }
        }
        else {
            try {
                await postsService.dislikePost(postId);
                likeIcon.classList.remove("liked");
                likesQuantity.textContent = (Number(likesQuantity.textContent) - 1).toString();
            }
            catch (error) {
                alert(error.message);
            }
        }
    });
}

export default likeController;