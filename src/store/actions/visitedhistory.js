const closeOneTab = key => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'REMOVE_VISITED_HISTORY',
            data: key
        });
        dispatch({
            type: 'REMOVE_CACHE_HISTORY',
            data: key
        });
        resolve(getState());
    })
}

const addOneTab = key => (dispatch, getState) => {
    dispatch({
        type: 'ADD_VISITED_HISTORY',
        data: key
    });
    dispatch({
        type: 'ADD_CACHE_HISTORY',
        data: key
    });
}

const closeOtherTab = key => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: 'REMOVE_OTHER_HISTORY',
            data: key
        });
        resolve(getState());
    })
}

const closeAllTab = () => dispatch => {
    dispatch({
        type: 'REMOVE_ALL_HISTORY'
    });
}

export {
    closeOneTab,
    addOneTab,
    closeOtherTab,
    closeAllTab
}