import userService from "/application/services/userService.js";
import loginUserRequest from "/data/DTOs/loginUserRequest.js";

const loginController = (form) => {
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const email = document.querySelector("input[type=email]");
        const password = document.querySelector("input[type=password]");

        const request = new loginUserRequest(email.value, password.value);

        try {
            await userService.loginUser(request);
            await route("/");
        } catch (error) {
            alert(error.message);
        }
    });
};

export default loginController;