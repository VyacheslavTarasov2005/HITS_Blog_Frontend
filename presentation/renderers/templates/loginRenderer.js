import loginController from "/presentation/controllers/loginController.js";

let loginView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('/presentation/views/templates/loginView.html').then((data) => data.text());

        document.title = 'Вход'

        loginController(document.querySelector("form"));
    }
}

export default loginView;