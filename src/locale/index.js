import zhCN from '@/locale/zh-CN.json';
import enUS from '@/locale/en-US.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const loadLocaleRes = () => {
    i18n.use(initReactI18next)
        .init({
            resources: {
                'zh-CN': {
                    translation: zhCN
                },
                'en-US': {
                    translation: enUS
                }
            },
            lng: window.localStorage.getItem('language') || 'zh-CN',
            fallbackLng: window.localStorage.getItem('language') || 'zh-CN',
            interpolation: {
                escapeValue: false
            }
        });
}
