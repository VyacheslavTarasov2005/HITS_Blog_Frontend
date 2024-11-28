import profileController from "/application/controllers/profileController.js";
import dropdownList from "/presentation/handlers/dropdownList.js";

let profileRenderer = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch("/presentation/views/templates/profileView.html")
                .then((data) => data.text());

        document.title = "Профиль";

        const form = document.querySelector("form");

        const genderSelectorButton = form.querySelector(".dropdown-button");
        const genderSelectorMenu = form.querySelector(".dropdown-menu");

        dropdownList(genderSelectorButton, genderSelectorMenu);
        await profileController();
    }
}

export default profileRenderer;