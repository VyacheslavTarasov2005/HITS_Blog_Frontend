import paginationView from "./paginationRenderer.js";
import postsController from "/application/controllers/postsController.js";

let postsView = {
    render: async (content) => {
        content.innerHTML += await fetch('/presentation/views/components/postsView.html')
            .then((data) => data.text());

        await paginationView.render(content);

        await postsController();
    }
}

export default postsView;