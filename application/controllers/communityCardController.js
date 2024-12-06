import communitiesService from "/domain/services/communitiesService.js";
import subscribeButtonController from "./subscribeButtonController.js";
import unsubscribeButtonController from "./unsubscribeButtonController.js";

const communityCardController = async () => {
    const communityCard = document.querySelector(".community-card");

    try {
        const communityInfo = await communitiesService
            .getCommunityInfo(window.location.pathname.split("/")[2]);

        communityCard.id = window.location.pathname.split("/")[2];

        const communityName = communityCard.querySelector("h1");
        communityName.textContent = `Группа: "${communityInfo.name}"`;
        document.title = communityInfo.name;

        const subscribersQuantity = communityCard.querySelector(".subscribers .quantity");
        subscribersQuantity.textContent = communityInfo.subscribersCount;

        const communityType = communityCard.querySelector(".community-type .type");
        if (communityInfo.isPrivate) {
            communityType.textContent = "закрытое";
        }
        else {
            communityType.textContent = "открытое";
        }

        switch (communityInfo.userRole) {
            case "Subscriber":
                const unsubscribeButton = communityCard.querySelector(".unsubscribe-button");
                unsubscribeButton.classList.remove("template");
                break;

            case "Administrator":
                const writePostLink = communityCard.querySelector(".write-post-link");
                writePostLink.classList.remove("disabled");

                writePostLink.addEventListener("click", () => {
                    window.community = {"id": window.location.pathname.split("/")[2],
                        name: communityInfo.name};
                });

                break;

            default:
                const subscribeButton = communityCard.querySelector(".subscribe-button");
                subscribeButton.classList.remove("template");
        }

        const adminsContainer = communityCard.querySelector(".admins");

        let adminInfo = adminsContainer.children[0];

        let adminAvatar = adminInfo.querySelector(".avatar");

        if (communityInfo.admins[0].gender === "Male") {
            const manAvatar = adminAvatar.querySelector(".man-avatar");
            manAvatar.classList.remove("template");
        }
        else {
            const womanAvatar = adminAvatar.querySelector(".woman-avatar");
            womanAvatar.classList.remove("template");
        }

        let adminName = adminInfo.querySelector(".name");
        adminName.textContent = communityInfo.admins[0].name;

        for (let i = 1; i < communityInfo.admins; i++) {
            const adminTemplate = adminsContainer.children[0].cloneNode(true);

            adminAvatar = adminInfo.querySelector(".avatar");

            if (communityInfo.admins[i].gender === "Male") {
                const manAvatar = adminAvatar.querySelector(".man-avatar");
                manAvatar.classList.remove("template");
            }
            else {
                const womanAvatar = adminAvatar.querySelector(".woman-avatar");
                womanAvatar.classList.remove("template");
            }

            let adminName = adminInfo.querySelector(".name");
            adminName.textContent = communityInfo.admins[i].name;

            adminsContainer.appendChild(adminTemplate);
        }

        await subscribeButtonController(communityCard);
        await unsubscribeButtonController(communityCard);
    }
    catch (error) {
        alert("Не удалось получить данные о сообществе");
        console.error(error);
    }
}

export default communityCardController;