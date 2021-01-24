import { constantRoutes } from '@/router';


const initstate = constantRoutes;

const permission = (state = initstate, action) => {
    switch(action.type) {
        case 'SET_ROUTES':
            return constantRoutes.concat(action.data);
        case 'RESET_ROUTES':
            return initstate;
        default:
            return state;
    }
}

export default permission;