import userService from "/domain/services/userService.js";
import genderConverter from "../converters/genderConverter.js";
import dateConverter from "../converters/dateConverter.js";
import editUserRequest from "/data/DTOs/editUserRequest.js";

const profileController = async () => {
    const form = document.querySelector('form');

    const email = document.querySelector('input[type="email"]');
    const fullName = document.querySelector('input[name="fullName"]');
    const phoneNumber = document.querySelector('input[name="phoneNumber"]');
    const gender = form.querySelector(".dropdown-button");
    const birthDate = document.querySelector('input[name="birthDate"]');

    const updateUi = async () => {
        try {
            const user = await userService.getUser();
            email.value = user.email;
            fullName.value = user.fullName;
            phoneNumber.value = user.phoneNumber;
            gender.textContent = genderConverter.convertFrom(user.gender);
            birthDate.value = user.birthDate === null ? "" : dateConverter.convertFrom(user.birthDate);
        }
        catch (error) {
            alert("Не удалось получить данные о пользователе");
            console.error(error);
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
            alert("Не удалось обновить данные пользователя");
            console.error(error);
        }
    })
}

export default profileController;