import tokenService from "/data/tokenService.js";

const writePostLinkController = () => {
    const token = tokenService.getToken();

    if (token) {
        const writePostLink = document.querySelector(".write-post-link");
        writePostLink.classList.remove("disabled");
    }
}

export default writePostLinkController;