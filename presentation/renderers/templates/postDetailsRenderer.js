import postDetailsController from "/presentation/controllers/postDetailsController.js";

let postDetailsRenderer = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch("/presentation/views/templates/postDetailsView.html")
                .then((data) => data.text());

        document.title = "Пост"

        await postDetailsController(document.querySelector(".post-details"));
    }
}

export default postDetailsRenderer;