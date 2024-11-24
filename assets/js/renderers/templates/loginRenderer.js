import login from '../../services/authService.js'

let loginView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch('assets/views/templates/loginView.html').then((data) => data.text());

        document.title = 'Вход'

        document.querySelector("form").addEventListener('submit', async event => {
            event.preventDefault();

            const email = document.querySelector("input[type=email]").value;
            const password = document.querySelector("input[type=password]").value;

            try {
                await login(email, password);
                route("/");
            } catch (error) {
                alert("Неверный логин или пароль");
                console.log(error);
            }
        });
    }
}

export default loginView;