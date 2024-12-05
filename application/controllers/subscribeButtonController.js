import communitiesService from "/domain/services/communitiesService.js";

const subscribeButtonController = async (communityBlock) => {
    const subscribeButton = communityBlock.querySelector(".subscribe-button");

    subscribeButton.addEventListener("click", async () => {
        try {
            await communitiesService.subscribe(communityBlock.id);
            subscribeButton.classList.add("template");

            const unsubscribeButton = communityBlock.querySelector(".unsubscribe-button");
            unsubscribeButton.classList.remove("template");
        }
        catch (error) {
            alert("Не удалось подписаться");
            console.error(error);
        }
    })
}

export default subscribeButtonController;