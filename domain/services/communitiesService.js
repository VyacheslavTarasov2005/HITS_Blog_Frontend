import api from "/data/api.js";
import communitiesListCommunityEntity from "../entities/communitiesListCommunityEntity.js";

const getCommunitiesList = async () => {
    const communitiesListResponse = await api.get("/community");
    if (communitiesListResponse.status !== 200) {
        throw new Error(communitiesListResponse.statusText);
    }

    let myCommunitiesLoaded = false
    const myCommunitiesResponse = await api.get("/community/my");
    if (myCommunitiesResponse.status === 200) {
        myCommunitiesLoaded = true;
    }

    let result = [];

    for (const community of communitiesListResponse.body) {
        let isAdded = false;

        if (myCommunitiesLoaded) {
            for (const myCommunity of myCommunitiesResponse.body) {
                if (community.id === myCommunity.communityId) {
                    const communityEntity = new communitiesListCommunityEntity(community.id,
                        community.name, myCommunity.role);
                    result.push(communityEntity);

                    isAdded = true;
                    break;
                }
            }
        }

        if (!isAdded) {
            const communityEntity = new communitiesListCommunityEntity(community.id,
                community.name, "notSubscribed");
            result.push(communityEntity);
        }
    }

    return result;
}

const subscribe = async (communityId) => {
    const response = await api.post(`/community/${communityId}/subscribe`);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

const unsubscribe = async (communityId) => {
    const response = await api.delete(`/community/${communityId}/unsubscribe`);

    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
}

export default {
    getCommunitiesList,
    subscribe,
    unsubscribe
}