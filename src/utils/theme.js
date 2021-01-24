export const getTheme = () => {
    return window.localStorage.getItem('theme');
}

export const setTheme = (theme) => {
    window.localStorage.setItem('theme', theme);
}