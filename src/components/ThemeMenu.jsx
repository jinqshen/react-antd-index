import React, { } from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '@/store/actions/setting';

function ThemeMenu() {
    
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const theme = useSelector(state => state.setting.theme);

    const changeTheme = themeRes => {
        dispatch(setTheme(themeRes));
    }

    return (
        <Menu defaultSelectedKeys={[ theme ]}>
            <Menu.Item key="light" onClick={() => changeTheme('light')}>
                {t('header.theme.light')}
            </Menu.Item>
            <Menu.Item key="dark" onClick={() => changeTheme('dark')}>
                {t('header.theme.dark')}
            </Menu.Item>
        </Menu>
    )
}

export default ThemeMenu;