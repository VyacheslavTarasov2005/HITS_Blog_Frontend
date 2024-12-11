import userService from "/application/services/userService.js";
import genderConverter from "/application/converters/genderConverter.js";
import dateConverter from "/application/converters/dateConverter.js";
import editUserRequest from "/data/DTOs/editUserRequest.js";
import phoneNumberInputHandler from "/presentation/handlers/phoneNumberInputHandler.js";

const profileController = async () => {
    const form = document.querySelector('form');

    const email = document.querySelector('input[type="email"]');
    const fullName = document.querySelector('input[name="fullName"]');

    const phoneNumber = document.querySelector('input[name="phoneNumber"]');
    phoneNumberInputHandler(phoneNumber);

    const gender = form.querySelector(".dropdown-button");
    const birthDate = document.querySelector('input[name="birthDate"]');

    const updateUi = async () => {
        try {
            const user = await userService.getUser();
            email.value = user.email;
            fullName.value = user.fullName;
            phoneNumber.value = user.phoneNumber;
            gender.textContent = genderConverter.convertFrom(user.gender);
            birthDate.value = user.birthDate === null ? "" : user.birthDate.substring(0, 10);
        }
        catch (error) {
            alert(error.message);
        }
    }

    await updateUi();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const request = new editUserRequest(email.value, fullName.value,
                birthDate.value === "" ? null : dateConverter.convertTo(birthDate.valueAsDate),
                genderConverter.convertTo(gender.textContent),
                phoneNumber.value === "" ? null : phoneNumber.value);

            await userService.editUser(request);
            await route("/profile");
        }
        catch (error) {
            alert(error.message);
        }
    });
}

export default profileController;