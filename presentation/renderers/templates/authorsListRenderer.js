import authorsListController from "/application/controllers/authorsListController.js";

let authorsListRenderer =  {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/authorsView.html').then((data) => data.text());

        document.title = "Авторы";

        await authorsListController();
    }
}

export default authorsListRenderer;