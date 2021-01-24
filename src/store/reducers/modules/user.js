import { getToken } from '@/utils/auth';

const initstate = {
    token: getToken(),
    nickName: '',
    avatar: '',
    introduction: '',
    roles: []
}

const user = (state = initstate, action) => {
    switch(action.type) {
        case 'SET_TOKEN':
            return Object.assign({}, state, { token: action.data });
        case 'SET_NICKNAME':
            return Object.assign({}, state, { nickName: action.data });
        case 'SET_AVATAR':
            return Object.assign({}, state, { avatar: action.data });
        case 'SET_INTRODUCTION':
            return Object.assign({}, state, { introduction: action.data });
        case 'SET_ROLES':
            return Object.assign({}, state, { roles: action.data });
        case 'RESET_USER':
            return Object.assign({}, initstate, { token: getToken() });
        default:
            return state;
    }
}

export default user;