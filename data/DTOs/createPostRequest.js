export default class createPostRequest {
    title;
    description;
    readingTime;
    image;
    addressId;
    tags;

    constructor(title, description, readingTime, image, addressId, tags) {
        this.title = title;
        this.description = description;
        this.readingTime = readingTime;
        this.image = image;
        this.addressId = addressId;
        this.tags = tags;
    }
}