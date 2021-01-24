import axios from 'axios';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import { getToken } from '@/utils/auth';
import store from '@/store';
import { logout } from '@/store/actions/user';

axios.interceptors.request.use(config => {
	NProgress.start();
	const token = getToken(process.env.REACT_APP_TOKEN);
	config.headers = {'Authorization': token, ...config.headers};
	config.url += `?token=${token}`;
	return config;
});

axios.interceptors.response.use(response => {
	NProgress.done(true);
	if(response.data.code === 401) {
		Modal.error({
			title: '登录信息已过期',
			icon: <ExclamationCircleOutlined />,
			content: '请重新登录',
			okText: '重新登录',
			onOk() {
			  store.dispatch(logout());
			}
		});
	}
	return response;
}, error => {
	NProgress.done(true);
	if(error.response.status === 401) {
		Modal.error({
			title: '登录信息已过期',
			icon: <ExclamationCircleOutlined />,
			content: '请重新登录',
			okText: '重新登录',
			onOk() {
			  store.dispatch(logout());
			}
		});
	}
	return Promise.reject(error);
});

