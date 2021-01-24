import axios from 'axios';
import { message } from 'antd';
import { setToken as storageToken, removeToken } from '@/utils/auth';
import { resetRoutes } from '@/store/actions/permission';
import { closeAllTab } from '@/store/actions/visitedhistory';

const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        data: token
    }
}

const setNickName = (nickName) => {
    return {
        type: 'SET_NICKNAME',
        data: nickName
    }
}

const setAvatar = (avatar) => {
    return {
        type: 'SET_AVATAR',
        data: avatar
    }
}

const setIntroduction = (introduction) => {
    return {
        type: 'SET_INTRODUCTION',
        data: introduction
    }
}

const setRoles = (roles) => {
    return {
        type: 'SET_ROLES',
        data: roles
    }
}

const resetUser = () => {
    return {
        type: 'RESET_USER'
    }
}

/**
 * 登录动作
 * @param {*} param0 
 */
const login =  ({ username, password }) => async dispatch => {
    try {
        const res = await axios.post(process.env.REACT_APP_HOST + '/user/login', { username, password });
        if(res.status === 200) {
            //登录成功
            if(res.data.code === 0) {
                storageToken(res.data.data.token);
                dispatch(setToken(res.data.data.token));
            } else {
                message.error(res.data.msg);
            }
        }else {
            throw new Error('response status code is : ' + res.status);
        }
    } catch(error) {
        console.log('login fail');
        console.log(error);
    }
}

/**
 * 获取用户信息
 */
const getUserInfo = () => async (dispatch) => {
    try {
        const res = await axios.get(process.env.REACT_APP_HOST + '/user/info');
        console.log(res);
        if(res.status === 200) {
            //获取用户信息成功
            if(res.data.code === 0) {
                dispatch(setNickName(res.data.data.nickName));
                dispatch(setAvatar(res.data.data.avatar));
                dispatch(setIntroduction(res.data.data.introduction));
                dispatch(setRoles(res.data.data.roles));
                return Promise.resolve();
            } else {
                return Promise.reject(res.data.msg);
            }
        }else {
            throw new Error('response status code is : ' + res.status);
        }
    } catch (error) {
        console.log('getUserInfo fail');
        console.log(error);
        return Promise.reject('获取用户信息失败');
    }
}

const logout = () => async dispatch => {
    removeToken();
    dispatch(resetUser());
    dispatch(resetRoutes());
    dispatch(closeAllTab());
}

export {
    login,
    logout,
    getUserInfo,
    setRoles
}