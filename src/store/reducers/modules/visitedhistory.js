const initstate = {
    visitedHistory: [
        {
            key: 'dashboard',
            closable: false
        }
    ],
    cacheHistory: []
}


const visitedhistory = (state = initstate, action) => {
    switch(action.type) {
        case 'ADD_VISITED_HISTORY':
            //如果已经在访问历史中，则返回原状态
            if(state.visitedHistory.some(history => history.key === action.data)) {
                return state;
            } else {
                //未在访问历史中，需添加tabs
                let visitedHistory = [...state.visitedHistory, { key: action.data, closable: true}];
                return Object.assign({}, state, { visitedHistory });
            }
        case 'ADD_CACHE_HISTORY':
            //每次访问的缓存历史都将更新到数组末尾
            let cacheHistory = state.cacheHistory.filter(history => history !== action.data);
            cacheHistory.push(action.data);
            return Object.assign({}, state, { cacheHistory });
        case 'REMOVE_VISITED_HISTORY':
            return Object.assign({}, state, { visitedHistory: state.visitedHistory.filter(history => history.key !== action.data || !history.closable) });
        case 'REMOVE_CACHE_HISTORY':
            return Object.assign({}, state, { cacheHistory: state.cacheHistory.filter(history => history !== action.data) });
        case 'REMOVE_OTHER_HISTORY':
            return Object.assign({}, state, { 
                visitedHistory: state.visitedHistory.filter(history => history.key === action.data || history.closable === false),
                cacheHistory: state.cacheHistory.filter(history => history === action.data)
            });
        case 'REMOVE_ALL_HISTORY':
            return initstate;
        default:
            return state;
    }
}

export default visitedhistory;