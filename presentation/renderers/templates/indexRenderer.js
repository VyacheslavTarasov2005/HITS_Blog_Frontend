import dropdownList from "/presentation/handlers/dropdownList.js";
import tagsController from "/presentation/controllers/tagsController.js";
import mainPostsFiltrationController from "/presentation/controllers/mainPostsFiltrationController.js";
import postsView from "../components/postsRenderer.js";
import writePostLinkController from "/presentation/controllers/writePostLinkController.js";

let indexView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/indexView.html').then((data) => data.text());

        document.title = 'Главная'

        await writePostLinkController();

        await postsView.render(document.querySelector("main .main-page"));

        const form = document.querySelector("form");

        const sortSelectorButton = form.querySelector(".dropdown-button");
        const sortSelectorMenu = form.querySelector(".dropdown-menu");

        dropdownList(sortSelectorButton, sortSelectorMenu);

        const tagsSelector = form.querySelector('select[name="tags"]');
        await tagsController(tagsSelector);
        await mainPostsFiltrationController(document.querySelector("main .main-page"));
    }
}

export default indexView;