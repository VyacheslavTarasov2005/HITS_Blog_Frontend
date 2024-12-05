export default class communityInfoEntity {
    name;
    subscribersCount;
    userRole;
    admins;
    isPrivate;

    constructor(name, subscribersCount, isSubscribed, admins, isPrivate) {
        this.name = name;
        this.subscribersCount = subscribersCount;
        this.userRole = isSubscribed;
        this.admins = admins;
        this.isPrivate = isPrivate;
    }
}