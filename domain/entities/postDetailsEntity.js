export default class postDetailsEntity {
    id
    createTime
    title
    description
    readingTime
    image
    author
    communityName
    address
    likes
    hasLike
    commentsCount
    tags
    comments

    constructor(id, createTime, title, description, readingTime, image, author, communityName, address, likes, hasLike,
                commentsCount, tags, comments) {
        this.id = id;
        this.createTime = createTime;
        this.title = title;
        this.description = description;
        this.readingTime = readingTime;
        this.image = image;
        this.author = author;
        this.communityName = communityName;
        this.address = address;
        this.likes = likes;
        this.hasLike = hasLike;
        this.commentsCount = commentsCount;
        this.tags = tags;
        this.comments = comments;
    }
}