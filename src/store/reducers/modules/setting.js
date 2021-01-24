import { getLocale, setLocale } from '@/utils/language';
import { getTheme, setTheme } from '@/utils/theme';

const defaultsetting = {
    locale: 'zh-CN',
    theme: 'light'
}

const initsetting = {
    locale: getLocale() || 'zh-CN',
    theme:  getTheme() || 'light'
} 

const setting = (state = initsetting, action) => {
    switch(action.type) {
        case 'SET_LOCALE':
            setLocale(action.data);
            return Object.assign({}, state, { locale: action.data });
        case 'SET_THEME':
            setTheme(action.data);
            return Object.assign({}, state, { theme: action.data });
        case 'RESET_SETTING':
            setLocale(defaultsetting.locale);
            setTheme(defaultsetting.theme);
            return defaultsetting;
        default:
            return state;
    }
}

export default setting;