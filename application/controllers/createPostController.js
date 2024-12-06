import postsService from "/domain/services/postsService.js";
import createPostRequest from "/data/DTOs/createPostRequest.js";
import addressesService from "/domain/services/addressesService.js";
import communitiesService from "/domain/services/communitiesService.js";

const createPostController = async (form) => {
    const title = form.querySelector('input[name="title"]');
    const body = form.querySelector('textarea[name="body"]');
    const readTime = form.querySelector('input[name="readTime"]');
    const imageUrl = form.querySelector('input[name="imageUrl"]');
    const tags = form.querySelector('select[name="tags"]');
    const addressesBlock = form.querySelector('.address');

    const groupContainer = form.querySelector('.group');
    const groupButton = groupContainer.querySelector('button');

    if (window.community) {
        groupButton.textContent = community.name;
        groupButton.id = community.id;
        delete window.community;
    }

    const groupMenu = groupContainer.querySelector('ul');

    groupMenu.children[0].addEventListener('click', () => {
        groupButton.removeAttribute('id');
    })

    const myCommunities = await communitiesService.getCommunitiesListWithAdminRole();
    myCommunities.forEach(community => {
        const communityAnswerTemplate = groupMenu.children[0].cloneNode(true);
        communityAnswerTemplate.textContent = community.name;
        communityAnswerTemplate.id = community.communityId;

        communityAnswerTemplate.addEventListener("click", () => {
            groupButton.textContent = community.name;
            groupButton.id = community.id;
        })

        groupMenu.appendChild(communityAnswerTemplate);
    });

    const loadSelector = async (parentId = null) => {
        const addressSelectorTemplate = addressesBlock.children[0].cloneNode(true);

        const name = addressSelectorTemplate.querySelector("p");
        if (parentId !== null) {
            name.textContent = "Следующий элемент адреса";
        }

        const selector = addressSelectorTemplate.querySelector("select");
        selector.id = addressesBlock.children.length;

        addressSelectorTemplate.classList.remove("template");

        addressesBlock.appendChild(addressSelectorTemplate);

        const selectorItem =  $('#' + selector.id);

        selectorItem.select2({
            ajax: {
                transport: async function (params, success, failure) {
                    try {
                        const query = params.data.term || '';
                        const addresses = await addressesService.getAddressByParentIdAndNamePart(parentId, query);
                        success(addresses.map(address => ({
                            text: address.text,
                            id: address.objectId,
                            guid: address.objectGuid,
                            level: address.objectLevel,
                            levelText: address.objectLevelText
                        })));
                    } catch (error) {
                        console.error(error);
                        failure(error);
                    }
                },
                processResults: function (data) {
                    return {
                        results: data
                    };
                },
                delay: 300,
                cache: true
            }
        });

        selectorItem.on('select2:select', async (event) => {
            const answer = event.params.data;

            name.textContent = answer.levelText;

            for (let i = addressesBlock.children.length - 1; i > selector.id; i--) {
                addressesBlock.children[i].remove();
            }

            if (answer.level !== "Building" && selector.id === (addressesBlock.children.length - 1).toString()) {
                await loadSelector(answer.id);
            }
        })
    }

    await loadSelector();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        let tagsId = [];

        [...tags.selectedOptions].forEach(tag => {
            tagsId.push(tag.value);
        });

        let addressGuid = null;

        if (addressesBlock.children.length > 2) {
            let lastSelectedAddressId = (addressesBlock.children[addressesBlock.children.length - 1]
                .querySelector("select").id).toString();

            if ($('#' + lastSelectedAddressId).select2('data').length > 0) {
                addressGuid = $('#' + lastSelectedAddressId).select2('data')[0].guid;
            }

            if (!addressGuid) {
                lastSelectedAddressId = (addressesBlock.children[addressesBlock.children.length - 2]
                    .querySelector("select").id).toString();
                addressGuid = $('#' + lastSelectedAddressId).select2('data')[0].guid;
            }

            console.log(addressGuid);
        }

        const request = new createPostRequest(title.value, body.value, readTime.value, imageUrl.value !== '' ? imageUrl.value : null,
            addressGuid, tagsId);

        try {
            if (groupButton.id) {
                await communitiesService.createPost(groupButton.id, request);
                await route(`/communities/${groupButton.id}`);
            }
            else {
                await postsService.createPost(request);
                await route("/");
            }
        }
        catch (error) {
            alert("Не удалось создать пост");
            console.error(error);
        }
    });
}

export default createPostController;