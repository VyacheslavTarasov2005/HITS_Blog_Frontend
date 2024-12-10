const setToken = (token) => {
    document.cookie = `token=${encodeURIComponent(token)}; path=/; Secure; SameSite=Strict`;
};

const removeToken = () => {
    document.cookie = `token=; path=/; Secure; SameSite=Strict`;
};

const getToken = () => {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
};

export default {
    setToken,
    removeToken,
    getToken
};