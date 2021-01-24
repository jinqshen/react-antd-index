import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeOneTab, addOneTab, closeAllTab, closeOtherTab } from '@/store/actions/visitedhistory';
import tabsViewCss from '@/styles/TabsView.module.less';

const { TabPane } = Tabs;

function TabsView(props) {

    const [ activeKey, setActiveKey ] = useState('dashboard');

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const mainMenu = location.pathname.split('/')[2];
        const subMenu = location.pathname.split('/')[3];
        if(subMenu) {
            dispatch(addOneTab(subMenu));
            setActiveKey(subMenu)
        } else {
            dispatch(addOneTab(mainMenu));
            setActiveKey(mainMenu);
        }
    }, [ location.pathname, dispatch ])

    const visitedHistory = useSelector(state => state.visitedhistory.visitedHistory);
    const cacheHistory = useSelector(state => state.visitedhistory.cacheHistory);
    const theme = useSelector(state => state.setting.theme);
    const routemap = useSelector(state => state.routemap);

    const [ menuVisible, setMenuVisible ] = useState(false);

    const closeMenu = () => {
        setMenuVisible(false);
    }

    useEffect(() => {
        if(menuVisible) {
            document.body.addEventListener('click', closeMenu);
        } else {
            document.body.removeEventListener('click', closeMenu);
        }
    }, [ menuVisible ]);

    const [ menuX, setMenuX ] = useState(0);
    const [ menuY, setMenuY ] = useState(0);

    const [ clickedTabKey, setClickedTabKey ] = useState(null);

    const openMenu = (e, key) => {
        e.preventDefault();
        setMenuVisible(true);
        setMenuY(e.clientY);
        setMenuX(e.clientX);
        setClickedTabKey(key);
    }

    const handleTabsEdit = (targetKey, action) => {
        if(action === 'remove') {
            closeSingleTab(targetKey)
        }
    }

    const handleTabClick = (key, event) => {
        dispatch(addOneTab(key));
        navigate(routemap[key].path);
    }

    const closeSingleTab = (targetKey) =>{
        console.log(targetKey);
        dispatch(closeOneTab(targetKey)).then(({ visitedhistory }) => {
            if(cacheHistory.pop() === targetKey) {//如果缓存视图为空，则重定向至主页
                let keytmp = visitedhistory.cacheHistory[visitedhistory.cacheHistory.length - 1] || 'dashboard';
                navigate(routemap[keytmp].path);
            }
        })
    }

    const closeOtherTabs = (targetKey) => {
        dispatch(closeOtherTab(targetKey)).then(() => {
            if(activeKey !== targetKey) {
                navigate(routemap[targetKey].path);
            }
        })
    }

    const closeAllTabs = () => {
        dispatch(closeAllTab());
        navigate(routemap['dashboard'].path);
    }

    const refreshTabs = key => {
        navigate(routemap[key].path);
    }

    return (
        <>
            <Tabs type="editable-card" hideAdd activeKey={activeKey} onChange={setActiveKey} size="small"
                onEdit={handleTabsEdit} onTabClick={handleTabClick}>
                {visitedHistory.map(history => {
                    return (
                        <TabPane tab={
                            <label onContextMenu={e => openMenu(e, history.key)}>{t(routemap[history.key].title)}</label>
                            } key={history.key} closable={history.closable}>
                        </TabPane> 
                    )
                })}
            </Tabs>
            <List className={theme === 'dark' ? tabsViewCss['contextmenu-dark'] : tabsViewCss['contextmenu-light']} style={ menuVisible ? { left: menuX, top: menuY } : {display: "none" }} bordered={true}>
                <List.Item className={tabsViewCss['contextmenu-item']} onClick={() => refreshTabs(clickedTabKey)}>
                    {t('tabsview.refresh')}
                </List.Item>
                { clickedTabKey === 'dashboard' ? null : (<List.Item className={tabsViewCss['contextmenu-item']} onClick={() => closeSingleTab(clickedTabKey)}>
                    {t('tabsview.close')}
                </List.Item>)}
                <List.Item className={tabsViewCss['contextmenu-item']} onClick={() => closeOtherTabs(clickedTabKey)}>
                    {t('tabsview.closeother')}
                </List.Item>
                <List.Item className={tabsViewCss['contextmenu-item']}onClick={closeAllTabs}>
                    {t('tabsview.closeall')}
                </List.Item>
            </List>
        </>
    )
}

export default TabsView;