import communitiesListController from "/application/controllers/communitiesListController.js";

let communitiesListRenderer = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/communitiesListView.html')
                .then((data) => data.text());

        document.title = "Сообщества";

        await communitiesListController();
    }
}

export default communitiesListRenderer;