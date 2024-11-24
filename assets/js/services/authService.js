import apiService from "./apiService.js";
import tokenService from "./tokenService.js";

const login = async (email, password) => {
    const response = await apiService.post("/account/login", {email: email, password: password});
    tokenService.setToken(response.token);
    return response;
};

export default login;