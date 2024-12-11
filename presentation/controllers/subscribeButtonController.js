import communitiesService from "/application/services/communitiesService.js";
import authChecker from "/application/authChecker.js";

const subscribeButtonController = async (communityBlock) => {
    const subscribeButton = communityBlock.querySelector(".subscribe-button");

    subscribeButton.addEventListener("click", async () => {
        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        try {
            await communitiesService.subscribe(communityBlock.id);
            subscribeButton.classList.add("template");

            const unsubscribeButton = communityBlock.querySelector(".unsubscribe-button");
            unsubscribeButton.classList.remove("template");
        }
        catch (error) {
            alert(error.message);
        }
    });
}

export default subscribeButtonController;