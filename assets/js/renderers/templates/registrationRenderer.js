import registerUserRequest from '/assets/js/DTOs/registerUserRequest.js';
import userService from "/assets/js/services/userService.js";

let registrationView = {
    render: async () => {
        document.querySelector("main").innerHTML =
            await fetch("assets/views/templates/registrationView.html").then((data) => data.text());

        document.title = "Регистрация";

        const main = document.querySelector("main");

        const genderSelectorButton = main.querySelector(".dropdown-button");
        const genderSelectorMenu = main.querySelector(".dropdown-menu");

        genderSelectorButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            genderSelectorMenu.style.display = genderSelectorMenu.style.display === "flex" ? "none" : "flex";
        })

        document.addEventListener("click", () => {
            genderSelectorMenu.style.display = "none";
        });

        const genders = genderSelectorMenu.querySelectorAll("li");

        genders.forEach(gender => {
            gender.addEventListener("click", (event) => {
                genderSelectorButton.textContent = gender.textContent;
            })
        })

        main.querySelector("form").addEventListener("submit", async event => {
            event.preventDefault();

            const name = document.querySelector("input[name='fullName']").value;
            const birthDate = document.querySelector("input[name='birthDate']").valueAsDate
                .toISOString();
            const gender = genderSelectorButton.textContent;
            const phoneNumber = document.querySelector("input[name='phoneNumber']").value;
            const email = document.querySelector("input[type='email']").value;
            const password = document.querySelector("input[type='password']").value;

            const credentials = new registerUserRequest(name, password, email, birthDate,
                (gender === "Мужчина" ? "Male" : "Female"), phoneNumber);

            try {
                await userService.registerUser(credentials);
                await route("/");
            }
            catch (error) {
                alert("Не удалось зарегистрировать пользователя");
                console.error(error);
            }
        });
    }
}

export default registrationView;