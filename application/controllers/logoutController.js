import userService from "/domain/services/userService.js";

const logoutController = (button) => {
    button.addEventListener('click', async event => {
        event.preventDefault();

        try {
            await userService.logoutUser();
            await route("/");
        }
        catch (error) {
            alert("Не удалось выйти из аккаунта");
            console.error(error);
        }
    })
};

export default logoutController;