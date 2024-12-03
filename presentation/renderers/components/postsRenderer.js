import postsController from "/application/controllers/postsController.js";

let postsView = {
    render: async (content) => {
        content.innerHTML += await fetch('/presentation/views/components/postsView.html')
            .then((data) => data.text());

        const postsBlock = content.querySelector('.posts');

        await postsController(postsBlock);
    }
}

export default postsView;