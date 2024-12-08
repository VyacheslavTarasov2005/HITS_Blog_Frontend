export default class commentReplyEntity {
    id
    createTime
    content
    modifiedDate
    deleteDate
    author
    isMine

    constructor(id, createTime, content, modifiedDate, deleteDate, author, isMine) {
        this.id = id;
        this.createTime = createTime
        this.content = content
        this.modifiedDate = modifiedDate
        this.deleteDate = deleteDate
        this.author = author
        this.isMine = isMine
    }
}