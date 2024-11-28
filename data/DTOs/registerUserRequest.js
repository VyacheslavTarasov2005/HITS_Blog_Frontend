export default class RegisterUserRequest {
    fullName;
    password;
    email;
    birthDate;
    gender;
    phoneNumber;

    constructor(fullName, password, email, birthDate, gender, phoneNumber) {
        this.fullName = fullName;
        this.password = password;
        this.email = email;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
    }
}