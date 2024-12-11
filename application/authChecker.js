import tokenRepository from "/data/tokenRepository";

const authChecker = () => {
    const token = tokenRepository.getToken();

    return !!token;
}

export default authChecker;