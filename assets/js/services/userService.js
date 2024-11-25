import apiService from "./apiService.js";
import tokenService from "./tokenService.js";

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
    loginUser,
    getUser
};