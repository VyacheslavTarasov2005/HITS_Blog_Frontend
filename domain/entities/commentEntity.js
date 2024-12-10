export default class commentEntity {
    id
    createTime
    content
    modifiedDate
    deleteDate
    author
    isMine
    subComments

    constructor(id, createTime, content, modifiedDate, deleteDate, author, isMine, subComments = 0) {
        this.id = id;
        this.createTime = createTime
        this.content = content
        this.modifiedDate = modifiedDate
        this.deleteDate = deleteDate
        this.author = author
        this.isMine = isMine
        this.subComments = subComments
    }
}