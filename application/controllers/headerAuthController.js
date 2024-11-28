import userService from "/domain/services/userService.js";
import dropdownButtons from "/presentation/handlers/dropdownButtons.js";
import tokenService from "/data/tokenService.js";

const headerAuthController = async () => {
    const header = document.querySelector("header");

    const renderLoginLink = () => {
        const profileButton = document.getElementById("profileButton");

        if (profileButton.style.display !== "") {
            profileButton.style.display = "";
        }

        const loginExists = !!document.getElementById("login");

        if (!loginExists) {
            const loginLink = document.createElement("a");
            loginLink.href = "/login";
            loginLink.text = "Вход";
            loginLink.id = "login";

            header.appendChild(loginLink);
        }
    }

    const renderProfileButton = async () => {
        const profileButton = document.getElementById("profileButton");

        const dropdownButton = profileButton.querySelector(".dropdown-button");

        const emailBlock = dropdownButton.querySelector(".email");

        const email = localStorage.getItem("email");

        if (email) {
            emailBlock.textContent = email;
        }
        else {
            try {
                const user = await userService.getUser();
                emailBlock.textContent = user.email;
                localStorage.setItem("email", user.email);
            }
            catch (error) {
                renderLoginLink();
                return;
            }
        }

        const loginLink = document.getElementById("login");

        if (loginLink) {
            loginLink.remove();
        }

        if (profileButton.style.display === "") {
            profileButton.style.display = "block";

            const dropdownMenu = profileButton.querySelector(".dropdown-menu");

            dropdownButtons(profileButton, dropdownMenu);
        }
    }

    const token = tokenService.getToken();

    if (!token) {
        renderLoginLink();
    }
    else {
        await renderProfileButton();
    }
};

export default headerAuthController;