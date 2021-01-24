import React from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Form, Input, Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined, LockOutlined, TranslationOutlined } from '@ant-design/icons';
import LocaleMenu from '@/components/LocaleMenu';
import { login as authLogin } from '@/store/actions/user';
import loginCss from '@/styles/Login.module.less';

function Login() {

	const dispatch = useDispatch();

	const { t } = useTranslation();

	const login = values => {
		dispatch(authLogin(values));
	}

	const visitorLogin = () => {
		const visitor = {
			username: 'visitor',
			password: 'visitor'
		};
		dispatch(authLogin(visitor));
	}

	return (
		<Row className={[loginCss['login-content']].join(' ')} justify="center" align="middle">
			<Col span={6}>
				<Form name="login" onFinish={login}>
					<Form.Item>
						<Dropdown overlay={<LocaleMenu />}>
							<Button type="text" className={[loginCss['language-btn']].join(' ')}>
								<TranslationOutlined className={[loginCss['language-logo']].join(' ')} />
							</Button>
						</Dropdown>
					</Form.Item>
					<Form.Item name="username" rules={[{ required: true, message: t('login.namerequire') }]}>
						<Input prefix={ <UserOutlined /> } placeholder={t('login.nameplace')} />
					</Form.Item>
					<Form.Item name="password" rules={[{ required: true, message: t('login.pswdrequire') }]}>
						<Input type="password" prefix={ <LockOutlined /> } placeholder={t('login.pswdplace')} />
					</Form.Item>
					<Form.Item>
						<Button className={[loginCss['login-btn']].join(' ')} type="primary" htmlType="submit">
							{t('login.loginbtn')}
						</Button>
					</Form.Item>
					<Form.Item>
						<Button className={[loginCss['login-btn']].join(' ')} type="primary" onClick={visitorLogin}>
							{t('login.visitorlogin')}
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default Login;