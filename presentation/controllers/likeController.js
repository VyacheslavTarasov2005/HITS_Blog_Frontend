import postsService from "/application/services/postsService.js";
import tokenRepository from "/data/tokenRepository.js";

const likeController = async (postId) => {
    const post = document.getElementById(postId);

    const likeContainer = post.querySelector('.like');

    const likesQuantity = likeContainer.querySelector('.quantity');

    const likeButton = likeContainer.querySelector('button');
    const likeIcon = likeButton.querySelector('svg');

    likeButton.addEventListener("click", async () => {
        const token = tokenRepository.getToken();
        if (!token) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        if (!likeIcon.classList.contains("liked")) {
            try {
                await postsService.likePost(postId);
                likeIcon.classList.add("liked");
                likesQuantity.textContent = (Number(likesQuantity.textContent) + 1).toString();
            }
            catch (e) {
                alert("Не удалось поставить лайк");
                console.error(e);
            }
        }
        else {
            try {
                await postsService.dislikePost(postId);
                likeIcon.classList.remove("liked");
                likesQuantity.textContent = (Number(likesQuantity.textContent) - 1).toString();
            }
            catch (e) {
                alert("Не удалось убрать лайк");
                console.error(e);
            }
        }
    })
}

export default likeController;