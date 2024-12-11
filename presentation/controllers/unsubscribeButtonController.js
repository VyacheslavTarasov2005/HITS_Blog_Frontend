import communitiesService from "/application/services/communitiesService.js";
import authChecker from "/application/authChecker";

const unsubscribeButtonController = async (communityBlock) => {
    const unsubscribeButton = communityBlock.querySelector(".unsubscribe-button");

    unsubscribeButton.addEventListener("click", async () => {
        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        try {
            await communitiesService.unsubscribe(communityBlock.id);
            unsubscribeButton.classList.add("template");

            const subscribeButton = communityBlock.querySelector(".subscribe-button");
            subscribeButton.classList.remove("template");
        }
        catch (error) {
            alert(error.message);
        }
    });
}

export default unsubscribeButtonController;