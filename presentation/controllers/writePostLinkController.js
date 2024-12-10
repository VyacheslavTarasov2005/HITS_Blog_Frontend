import tokenRepository from "/data/tokenRepository.js";

const writePostLinkController = () => {
    const token = tokenRepository.getToken();

    if (token) {
        const writePostLink = document.querySelector(".write-post-link");
        writePostLink.classList.remove("disabled");
    }
}

export default writePostLinkController;