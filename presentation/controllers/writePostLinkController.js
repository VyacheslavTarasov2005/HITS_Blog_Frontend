import authChecker from "/application/authChecker.js";

const writePostLinkController = () => {
    if (authChecker()) {
        const writePostLink = document.querySelector(".write-post-link");
        writePostLink.classList.remove("disabled");
    }
}

export default writePostLinkController;