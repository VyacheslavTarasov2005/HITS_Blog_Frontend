import api from "/data/api.js";
import communitiesListCommunityEntity from "../entities/communitiesListCommunityEntity.js";
import communityInfoEntity from "../entities/communityInfoEntity.js";
import adminEntity from "../entities/adminEntity.js";

const getUserRole = async (communityId) => {
    const response = await api.get(`/community/${communityId}/role`);

    if (response.status === 200) {
        return response.body;
    }
    else if (response.status === 401) {
        return null;
    }
    else {
        throw new Error(response.statusText);
    }
}

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

const getCommunityPosts = async (communityId) => {
    const response = await api.get(`/community/${communityId}/post`, undefined,
        new URLSearchParams(window.location.search));

    if (response.status === 200) {
        return response.body;
    }
    else {
        throw new Error(response.statusText);
    }
}

const getCommunityInfo = async (communityId) => {
    const communityInfoResponse = await api.get(`/community/${communityId}`);

    let admins = [];
    if (communityInfoResponse.status === 200) {
        communityInfoResponse.body.administrators.forEach((administrator) => {
            const admin = new adminEntity(administrator.fullName, administrator.gender);
            admins.push(admin);
        })
    }
    else {
        throw new Error(communityInfoResponse.statusText);
    }

    const userRole = await getUserRole(communityId);

    return new communityInfoEntity(communityInfoResponse.body.name, communityInfoResponse.body.subscribersCount,
        userRole, admins, communityInfoResponse.body.isClosed);
}

export default {
    getUserRole,
    getCommunitiesList,
    subscribe,
    unsubscribe,
    getCommunityPosts,
    getCommunityInfo
}