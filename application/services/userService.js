import api from "/data/api.js";
import tokenRepository from "/data/tokenRepository.js";

const registerUser = async (registerUserRequest) => {
    const response = await api.post("/account/register", registerUserRequest);

    if (response.status === 200) {
        tokenRepository.setToken(response.body.token);

        const lsEmail = localStorage.getItem("email");

        if (lsEmail) {
            localStorage.removeItem("email");
        }
    }
    else {
        if (response.body.DuplicateUserName) {
            throw new Error("Пользователь с такой почтой уже существует")
        }

        throw new Error("Не удалось зарегистрировать пользователя");
    }
}

const loginUser = async (loginUserRequset) => {
    const response = await api.post("/account/login", loginUserRequset);

    if (response.status === 200) {
        tokenRepository.setToken(response.body.token);
        localStorage.removeItem("email");
    }
    else {
        throw new Error("Не удалось войти в аккаунт");
    }
}

const logoutUser = async () => {
    const response = await api.post("/account/logout");

    if (response.status === 200 || response.status === 401) {
        tokenRepository.removeToken();
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
    }
    else {
        throw new Error("Не удалось выйти из аккаунта");
    }
}

const getUser = async () => {
    const response = await api.get("/account/profile");

    if (response.status === 200) {
        return response.body;
    }
    else {
        if (response.status === 401) {
            throw new Error("Не удалось получить данные о пользователе, ваша сессия истекла, перезайдите в аккаунт");
        }

        throw new Error("Не удалось получить данные о пользователе");
    }
}

const editUser = async (editUserRequest) => {
    const response = await api.put("/account/profile", editUserRequest);

    if (response.status === 200) {
        localStorage.removeItem("email");
    }
    else {
        if (response.status === 401) {
            throw new Error("Не удалось изменить данные о пользователе, ваша сессия истекла, перезайдите в аккаунт");
        }

        if (response.body.errors.Email) {
            throw new Error("Пользователь с такой почтой уже существует");
        }

        throw new Error("Не удалось изменить данные о пользователе");
    }
}

export default {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    editUser
}