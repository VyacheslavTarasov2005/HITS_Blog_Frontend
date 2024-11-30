import dropdownList from "/presentation/handlers/dropdownList.js";
import tagsController from "/application/controllers/tagsController.js";

let indexView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/indexView.html').then((data) => data.text());

        document.title = 'Главная'

        const form = document.querySelector("form");

        const sortSelectorButton = form.querySelector(".dropdown-button");
        const sortSelectorMenu = form.querySelector(".dropdown-menu");

        dropdownList(sortSelectorButton, sortSelectorMenu);

        const tagsSelector = form.querySelector('select[name="tags"]');
        await tagsController(tagsSelector);
    }
}

export default indexView;