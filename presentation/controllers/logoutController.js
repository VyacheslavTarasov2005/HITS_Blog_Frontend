import userService from "/application/services/userService.js";

const logoutController = (button) => {
    button.addEventListener('click', async event => {
        event.preventDefault();

        try {
            await userService.logoutUser();
            await route("/");
        }
        catch (error) {
            alert(error.message);
        }
    });
};

export default logoutController;