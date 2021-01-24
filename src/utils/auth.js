const getToken = () => window.localStorage.getItem(process.env.REACT_APP_TOKEN);

const setToken = (token) => {
    window.localStorage.setItem(process.env.REACT_APP_TOKEN, token);
}

const removeToken = () => {
    window.localStorage.removeItem(process.env.REACT_APP_TOKEN);
}

export {
    getToken,
    setToken,
    removeToken
}