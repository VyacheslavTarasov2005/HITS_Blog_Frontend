import userService from "/domain/services/userService.js";
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
            alert("Неверный логин или пароль");
            console.error(error);
        }
    });
};

export default loginController;