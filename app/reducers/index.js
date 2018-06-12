import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import {addDirectory, renameFile, deleteFile} from '../utils';

const hierarchy = (state = '', action) => {
    switch (action.type) {
        case types.filter:
            return action.filter;
        case types.CREATE_DIRECTORY:
            return addDirectory(action);
        case types.RENAME_FILE:
            return renameFile(action);
        case types.DELETE_FILE:
            return deleteFile(action);
        default:
            return state;
    }
};
const pwd = (state = '', action) => {
    switch (action.type) {
        case types.CHANGE_PWD:
            return action.pwd;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    hierarchy,
    pwd,
    routing
});

export default rootReducer;
