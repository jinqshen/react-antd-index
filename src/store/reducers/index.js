import { combineReducers } from 'redux';
import user from '@/store/reducers/modules/user';
import permission from '@/store/reducers/modules/permission';
import setting from '@/store/reducers/modules/setting';
import routemap from '@/store/reducers/modules/routemap';
import visitedhistory from '@/store/reducers/modules/visitedhistory';

const rootReducer = combineReducers({
    user,
    permission,
    setting,
    routemap,
    visitedhistory
});

export default rootReducer;