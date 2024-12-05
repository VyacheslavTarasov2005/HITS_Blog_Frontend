import communityCardController from "/application/controllers/communityCardController.js";
import postsView from "../components/postsRenderer.js";
import communityPostsFiltrationController from "/application/controllers/communityPostsFiltrationController.js";
import tagsController from "/application/controllers/tagsController.js";
import dropdownList from "/presentation/handlers/dropdownList.js";

let communityView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/communityView.html')
                .then((data) => data.text());

        await postsView.render(document.querySelector(".community"));

        await communityCardController();

        const form = document.querySelector("form");

        const sortSelectorButton = form.querySelector(".dropdown-button");
        const sortSelectorMenu = form.querySelector(".dropdown-menu");

        dropdownList(sortSelectorButton, sortSelectorMenu);

        const tagsSelector = form.querySelector('select[name="tags"]');
        await tagsController(tagsSelector);
        await communityPostsFiltrationController();
    }
}

export default communityView;