import communitiesService from "/domain/services/communitiesService.js";
import subscribeButtonController from "./subscribeButtonController.js";
import unsubscribeButtonController from "./unsubscribeButtonController.js";

const communitiesListController = async () => {
    const communitiesContainer = document.querySelector(".communities");

    try {
        const communities = await communitiesService.getCommunitiesList();

        for (const community of communities) {
            const communityTemplate = communitiesContainer.children[0].cloneNode(true);

            communityTemplate.id = community.id;

            const communityName = communityTemplate.querySelector(".community-name");
            communityName.textContent = community.name;
            communityName.href = `/communities/${community.id}`;

            if (community.status === "notSubscribed") {
                const subscribeButton = communityTemplate.querySelector(".subscribe-button");
                subscribeButton.classList.remove("template");
            }
            else if (community.status === "Subscriber") {
                const unsubscribeButton = communityTemplate.querySelector(".unsubscribe-button");
                unsubscribeButton.classList.remove("template");
            }

            communityTemplate.classList.remove("template");
            communitiesContainer.appendChild(communityTemplate);

            await subscribeButtonController(communityTemplate);
            await unsubscribeButtonController(communityTemplate);
        }
    }
    catch (error) {
        alert("Не удалось загрузить сообщества");
        console.error(error);
    }
}

export default communitiesListController;