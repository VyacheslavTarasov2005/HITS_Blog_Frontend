import headerAuthController from "/application/controllers/headerAuthController.js";

let headerView = {
    render: async (route) => {
        const header = document.querySelector("header");
        const nav = header.querySelector("header nav");
        const navLinks = nav.querySelectorAll("a");

        const linksNames = new Map([["/authors", "Авторы"], ["/communities", "Группы"]]);

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
                updateHeader(["/authors", "/communities"]);
                break;

            case "/communities":
                updateHeader(["/authors", "/communities"]);
                break;

            case "/authors":
                updateHeader(["/authors"]);
                break;

            default:
                updateHeader();
                break;
        }

        await headerAuthController();
    }
}

export default headerView;