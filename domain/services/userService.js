import apiService from "/data/api.js";
import tokenService from "/data/tokenService.js";

const registerUser = async (registerUserRequest) => {
    const response = await apiService.post("/account/register", registerUserRequest);
    tokenService.setToken(response.token);

    const lsEmail = localStorage.getItem("email");

    if (lsEmail) {
        localStorage.removeItem("email");
    }

    return response;
};

const loginUser = async (loginUserRequset) => {
    const response = await apiService.post("/account/login", loginUserRequset);
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