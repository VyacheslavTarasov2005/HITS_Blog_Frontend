import api from "/data/api.js";
import communitiesListCommunityEntity from "/domain/entities/communitiesListCommunityEntity.js";
import communityInfoEntity from "/domain/entities/communityInfoEntity.js";
import adminEntity from "/domain/entities/adminEntity.js";

const getUserRole = async (communityId) => {
    const response = await api.get(`/community/${communityId}/role`);

    if (response.status === 200) {
        return response.body;
    }
    else if (response.status === 401) {
        return null;
    }
    else {
        if (response.status === 404) {
            throw new Error("Сообщество не найдено");
        }

        throw new Error("Не удалось получить роль пользователя");
    }
}

const getCommunitiesList = async () => {
    const communitiesListResponse = await api.get("/community");
    if (communitiesListResponse.status !== 200) {
        throw new Error("Не удалось загрузить сообщества");
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

const getCommunitiesListWithAdminRole = async () => {
    const communitiesListResponse = await api.get("/community");

    let result = [];
    for (const community of communitiesListResponse.body) {
        const communityRole = await getUserRole(community.id);

        if (communityRole === "Administrator") {
            result.push(community);
        }
    }

    return result;
}

const subscribe = async (communityId) => {
    const response = await api.post(`/community/${communityId}/subscribe`);

    if (response.status !== 200) {
        if (response.status === 401) {
            throw new Error("Не удалось подписаться на сообщество, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 404) {
            throw new Error("Сообщество не найдено");
        }

        throw new Error("Не удалось подписаться на сообщество");
    }
}

const unsubscribe = async (communityId) => {
    const response = await api.delete(`/community/${communityId}/unsubscribe`);

    if (response.status !== 200) {
        if (response.status === 401) {
            throw new Error("Не удалось отписаться от сообщества, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 404) {
            throw new Error("Сообщество не найдено");
        }

        throw new Error("Не удалось отписаться от сообщества");
    }
}

const getCommunityPosts = async (communityId) => {
    const response = await api.get(`/community/${communityId}/post`, undefined,
        new URLSearchParams(window.location.search));

    if (response.status === 200) {
        return response.body;
    }
    else {
        if (response.status === 401) {
            throw new Error("Не удалось загрузить посты сообщества, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 403) {
            throw new Error("Вы не имеете доступа к постам данного сообщества");
        }

        if (response.status === 404) {
            throw new Error("Сообщество не найдено");
        }

        throw new Error("Не удалось загрузить посты сообщества");
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
        if (communityInfoResponse.status === 404) {
            throw new Error("Сообщество не найдено");
        }

        throw new Error("Не удалось загрузить информацию о сообществе");
    }

    const userRole = await getUserRole(communityId);

    return new communityInfoEntity(communityInfoResponse.body.name, communityInfoResponse.body.subscribersCount,
        userRole, admins, communityInfoResponse.body.isClosed);
}

const createPost = async (communityId, request) => {
    const response = await api.post(`/community/${communityId}/post`, request);

    if (response.status !== 200) {
        if (response.status === 401) {
            throw new Error("Не удалось создать пост, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.status === 403) {
            throw new Error("Вам запрещено создание постов в этом сообществе");
        }

        if (response.status === 404) {
            throw new Error("Сообщество не найдено");
        }

        throw new Error("Не удалось создать пост");
    }
}

export default {
    getUserRole,
    getCommunitiesList,
    getCommunitiesListWithAdminRole,
    subscribe,
    unsubscribe,
    getCommunityPosts,
    getCommunityInfo,
    createPost
}