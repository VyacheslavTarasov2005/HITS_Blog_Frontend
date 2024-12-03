import communitiesService from "/domain/services/communitiesService.js";

const unsubscribeButtonController = async (communityBlock) => {
    const unsubscribeButton = communityBlock.querySelector(".unsubscribe");

    unsubscribeButton.addEventListener("click", async () => {
        try {
            await communitiesService.unsubscribe(communityBlock.id);
            unsubscribeButton.classList.add("template");

            const subscribeButton = communityBlock.querySelector(".subscribe");
            subscribeButton.classList.remove("template");
        }
        catch (error) {
            alert("Не удалось подписаться");
            console.error(error);
        }
    })
}

export default unsubscribeButtonController;