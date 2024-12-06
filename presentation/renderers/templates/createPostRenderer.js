import createPostController from "/application/controllers/createPostController.js";
import tagsController from "/application/controllers/tagsController.js";
import dropdownList from "../../handlers/dropdownList.js";

let createPostRenderer = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/createPostView.html').then((data) => data.text());

        document.title = "Создание поста";

        const form = document.querySelector("form");

        await createPostController(document.querySelector("form"));

        const tagsSelector = form.querySelector('select[name="tags"]');
        await tagsController(tagsSelector);

        const groupSelectorButton = form.querySelector(".dropdown-button");
        const groupSelectorMenu = form.querySelector(".dropdown-menu");
        dropdownList(groupSelectorButton, groupSelectorMenu);
    }
}

export default createPostRenderer;