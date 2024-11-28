import registerUserRequest from "/data/DTOs/registerUserRequest.js";
import userService from "/domain/services/userService.js";

const registrationController = (form) => {
    form.addEventListener("submit", async event => {
        event.preventDefault();

        const name = form.querySelector("input[name='fullName']").value;
        const birthDate = form.querySelector("input[name='birthDate']").valueAsDate
            .toISOString();

        const genderSelectorButton = form.querySelector(".dropdown-button");
        const gender = genderSelectorButton.textContent;

        const phoneNumber = document.querySelector("input[name='phoneNumber']").value;
        const email = document.querySelector("input[type='email']").value;
        const password = document.querySelector("input[type='password']").value;

        const request = new registerUserRequest(name, password, email, birthDate,
            (gender === "Мужчина" ? "Male" : "Female"), phoneNumber);

        try {
            await userService.registerUser(request);
            await route("/");
        }
        catch (error) {
            alert("Не удалось зарегистрировать пользователя");
            console.error(error);
        }
    })
}

export default registrationController;