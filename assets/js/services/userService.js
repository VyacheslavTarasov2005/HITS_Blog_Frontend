import apiService from "./apiService.js";
import tokenService from "./tokenService.js";

import registerUserRequest from "/assets/js/DTOs/registerUserRequest.js";

const registerUser = async (registerUserRequest) => {
    const response = await apiService.post("/account/register", registerUserRequest);
    tokenService.setToken(response.token);

    const lsEmail = localStorage.getItem("email");

    if (lsEmail) {
        localStorage.removeItem("email");
    }

    return response;
};

const loginUser = async (email, password) => {
    const response = await apiService.post("/account/login", {email: email, password: password});
    tokenService.setToken(response.token);

    const lsEmail = localStorage.getItem("email");

    if (lsEmail) {
        localStorage.removeItem("email");
    }

    return response;
};

const getUser = async () => {
    return await apiService.get("/account/profile", undefined, true);
}

export default {
    registerUser,
    loginUser,
    getUser
};