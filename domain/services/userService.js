import apiService from "/data/api.js";
import tokenService from "/data/tokenService.js";

const registerUser = async (registerUserRequest) => {
    const response = await apiService.post("/account/register", registerUserRequest);

    if (response.status === 200) {
        tokenService.setToken(response.body.token);

        const lsEmail = localStorage.getItem("email");

        if (lsEmail) {
            localStorage.removeItem("email");
        }
    }
    else {
        throw new Error(response.statusText);
    }
};

const loginUser = async (loginUserRequset) => {
    const response = await apiService.post("/account/login", loginUserRequset);

    if (response.status === 200) {
        tokenService.setToken(response.body.token);
        localStorage.removeItem("email");
    }
    else {
        throw new Error(response.statusText);
    }
};

const logoutUser = async () => {
    const response = await apiService.post("/account/logout", undefined, true);

    if (response.status === 200 || response.status === 401) {
        tokenService.removeToken();
        localStorage.removeItem("email");
    }
    else {
        throw new Error(response.statusText);
    }
}

const getUser = async () => {
    const response = await apiService.get("/account/profile", undefined, true);

    if (response.status === 200) {
        return response.body;
    }
    else {
        throw new Error(response.statusText);
    }
}

export default {
    registerUser,
    loginUser,
    logoutUser,
    getUser
};