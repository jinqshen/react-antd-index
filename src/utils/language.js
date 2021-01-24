export const getLocale = () => {
    return window.localStorage.getItem('language');
}

export const setLocale = (locale) => {
    window.localStorage.setItem('language', locale);
}