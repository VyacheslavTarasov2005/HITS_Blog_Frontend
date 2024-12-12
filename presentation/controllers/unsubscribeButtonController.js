import communitiesService from "/application/services/communitiesService.js";
import authChecker from "/application/authChecker";

let isLoading = false;

const unsubscribeButtonController = async (communityBlock) => {
    const unsubscribeButton = communityBlock.querySelector(".unsubscribe-button");

    unsubscribeButton.addEventListener("click", async () => {
        if (isLoading) {
            return;
        }

        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        isLoading = true;

        try {
            await communitiesService.unsubscribe(communityBlock.id);
            unsubscribeButton.classList.add("template");

            const subscribeButton = communityBlock.querySelector(".subscribe-button");
            subscribeButton.classList.remove("template");
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            isLoading = false;
        }
    });
}

export default unsubscribeButtonController;