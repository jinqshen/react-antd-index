export const setLocale = (locale) =>{
    return {
        type: 'SET_LOCALE',
        data: locale
    }
}

export const setTheme = (theme) => {
    return {
        type: 'SET_THEME',
        data: theme
    }
}