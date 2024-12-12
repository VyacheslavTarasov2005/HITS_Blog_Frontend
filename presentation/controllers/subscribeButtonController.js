import communitiesService from "/application/services/communitiesService.js";
import authChecker from "/application/authChecker.js";

let isLoading = false;

const subscribeButtonController = async (communityBlock) => {
    const subscribeButton = communityBlock.querySelector(".subscribe-button");

    subscribeButton.addEventListener("click", async () => {
        if (isLoading) {
            return;
        }

        if (!authChecker()) {
            alert("Необходимо войти в аккаунт");
            return;
        }

        isLoading = true;

        try {
            await communitiesService.subscribe(communityBlock.id);
            subscribeButton.classList.add("template");

            const unsubscribeButton = communityBlock.querySelector(".unsubscribe-button");
            unsubscribeButton.classList.remove("template");
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            isLoading = false;
        }
    });
}

export default subscribeButtonController;