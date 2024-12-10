import dropdownList from "/presentation/handlers/dropdownList.js";
import registrationController from "/presentation/controllers/registrationController.js";

let registrationView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch("/presentation/views/templates/registrationView.html")
                .then((data) => data.text());

        document.title = "Регистрация";

        const form = document.querySelector("form");

        const genderSelectorButton = form.querySelector(".dropdown-button");
        const genderSelectorMenu = form.querySelector(".dropdown-menu");

        dropdownList(genderSelectorButton, genderSelectorMenu);
        registrationController(form);
    }
}

export default registrationView;