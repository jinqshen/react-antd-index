import React, { } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Row, Col, Tooltip, Button, Avatar, Dropdown, Menu, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, CaretDownOutlined, GithubOutlined, TranslationOutlined, ToolOutlined } from '@ant-design/icons';
import LocaleMenu from '@/components/LocaleMenu';
import ThemeMenu from '@/components/ThemeMenu';
import { logout } from '@/store/actions/user';
import myHeaderCss from '@/styles/MyHeader.module.less';


const { Header } = Layout;

function MyHeader(props) {

    const { t } = useTranslation();

    const collapsed = props.siderCollapsed;

    const setCollapsed = props.setSiderCollapsed;

    const userInfo = useSelector(state => state.user);

    const theme = useSelector(state => state.setting.theme);

    return (
        <Header className={[theme === 'light' ? myHeaderCss['bg-white'] : null].join(' ')}>
            <Row justify="space-between">
                <Col>
                    <Button type="text" style={{marginLeft: -30}} onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <Tooltip title={t('header.openmenu')}><MenuUnfoldOutlined /></Tooltip> : <Tooltip title={t('header.collapsemenu')}><MenuFoldOutlined /></Tooltip>}
                    </Button>
                </Col>
                <Col>
                    <Space>
                        <Dropdown overlay={<ThemeMenu />}>
                            <Button type="text" className={[myHeaderCss['avatar-btn']].join(' ')}>
                                <ToolOutlined className={[myHeaderCss['locale']].join(' ')} />
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={<LocaleMenu />}>
                            <Button type="text" className={[myHeaderCss['avatar-btn']].join(' ')}>
                                <TranslationOutlined className={[myHeaderCss['locale']].join(' ')} />
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={<PersonMenu />} trigger={['click']}>
                            <Button type="text" className={[myHeaderCss['avatar-btn']].join(' ')}>
                                <Avatar src={userInfo.avatar} />
                                <CaretDownOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
        </Header>
    )
}

function PersonMenu() {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const navigate = useNavigate();

    const userLogout = () => {
        navigate('/');
        dispatch(logout());
    }

    return (
        <Menu>
            <Menu.Item key="0" onClick={userLogout}>
                <GithubOutlined />
                <span>{t('header.logout')}</span>
            </Menu.Item>
        </Menu>
    )
}



export default MyHeader;