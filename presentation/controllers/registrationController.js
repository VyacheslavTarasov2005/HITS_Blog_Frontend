import registerUserRequest from "/data/DTOs/registerUserRequest.js";
import userService from "/application/services/userService.js";
import dateConverter from "/application/converters/dateConverter.js";
import genderConverter from "/application/converters/genderConverter.js";
import phoneNumberInputHandler from "/presentation/handlers/phoneNumberInputHandler.js";

const registrationController = (form) => {
    const name = form.querySelector("input[name='fullName']");
    const birthDate = form.querySelector("input[name='birthDate']");
    const gender = form.querySelector(".dropdown-button");

    const phoneNumber = document.querySelector("input[name='phoneNumber']");
    phoneNumberInputHandler(phoneNumber);

    const email = document.querySelector("input[type='email']");
    const password = document.querySelector("input[type='password']");

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const request = new registerUserRequest(name.value, password.value, email.value,
            birthDate.value === "" ? null : dateConverter.convertTo(birthDate.valueAsDate),
            genderConverter.convertTo(gender.textContent),
            phoneNumber.value === "" ? null : phoneNumber.value);

        try {
            await userService.registerUser(request);
            await route("/");
        }
        catch (error) {
            alert(error.message);
        }
    });
}

export default registrationController;