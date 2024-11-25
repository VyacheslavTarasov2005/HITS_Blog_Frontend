import tokenService from "/assets/js/services/tokenService.js";
import userService from "/assets/js/services/userService.js";

let headerView = {
    render: async (route) => {
        const header = document.querySelector("header");
        const nav = header.querySelector("header nav");
        const navLinks = nav.querySelectorAll("a");

        const linksNames = new Map([["/authors", "Авторы"], ["/groups", "Группы"]]);

        const addNavLink = (href) => {
            const link = document.createElement("a");
            link.textContent = linksNames.get(href);
            link.href = href;

            nav.appendChild(link);
        }

        const updateHeader = (validLinks = []) => {
            Array.from(nav.children).forEach((link) => {
                if ((link.href !== window.location.origin + "/") && !validLinks.some(validLink =>
                    window.location.origin + validLink === link.href)) {
                    nav.removeChild(link);
                }
            });

            Array.from(validLinks).forEach((link) => {
                if(![...navLinks].some(navLink => navLink.href === window.location.origin + link)) {
                    addNavLink(link);
                }
            });
        }

        switch (route) {
            case "/":
                updateHeader(["/authors", "/groups"]);
                break;

            case "/login":
                updateHeader();
                break;

            default:
                updateHeader();
                break;
        }

        const renderLoginLink = () => {
            const profileButton = header.querySelector("#profileButton");

            if (profileButton.style.display !== "") {
                profileButton.style.display = "";
            }

            const loginExists = !!header.querySelector("#login");

            if (!loginExists) {
                const loginLink = document.createElement("a");
                loginLink.href = "/login";
                loginLink.text = "Вход";
                loginLink.id = "login";

                header.appendChild(loginLink);
            }
        }

        const renderProfileButton = async () => {
            const profileButton = header.querySelector("#profileButton");

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

            const loginLink = header.querySelector("#login");

            if (loginLink) {
                loginLink.remove();
            }

            if (profileButton.style.display === "") {
                profileButton.style.display = "block";

                const dropdownMenu = profileButton.querySelector(".dropdown-menu");

                dropdownButton.addEventListener("click", (event) => {
                    event.stopPropagation();
                    dropdownMenu.style.display = dropdownMenu.style.display === "flex" ? "none" : "flex";
                })

                document.addEventListener("click", () => {
                    dropdownMenu.style.display = "none";
                });
            }
        }

        const token = tokenService.getToken();

        if (!token) {
            renderLoginLink();
        }
        else {
            await renderProfileButton();
        }
    }
}

export default headerView;