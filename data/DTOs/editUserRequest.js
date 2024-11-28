export default class editUserRequest {
    email;
    fullName;
    birthDate;
    gender;
    phoneNumber;

    constructor(email, fullName, birthDate, gender, phoneNumber) {
        this.email = email;
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
    }
}