export default class GetPostsRequest {
    tags;
    author;
    min;
    max;
    sorting;
    onlyMyCommunities;
    page;
    size;

    constructor(tags, author, min, max, sorting, onlyMyCommunities, page, size) {
        this.tags = tags;
        this.author = author;
        this.min = min;
        this.max = max;
        this.sorting = sorting;
        this.onlyMyCommunities = onlyMyCommunities;
        this.page = page;
        this.size = size;
    }
}