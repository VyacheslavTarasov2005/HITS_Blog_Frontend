export default class LoginUserRequest {
    email;
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}