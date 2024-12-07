export default class createCommentRequest {
    content
    parentId

    constructor(content, parentId) {
        this.content = content
        this.parentId = parentId
    }
}