import userService from "/domain/services/userService.js";
import registerUserRequest from "/data/DTOs/loginUserRequest.js";

const loginController = (form) => {
    form.addEventListener('submit', async event => {
        event.preventDefault();

        const email = document.querySelector("input[type=email]").value;
        const password = document.querySelector("input[type=password]").value;

        const request = new registerUserRequest(email, password);

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