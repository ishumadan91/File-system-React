import * as types from './types';

export function changePWD(pwd) {
    return {
        type: types.CHANGE_PWD,
        pwd
    };
}
export function deleteFile(name, pwd, hierarchy) {
    return {
        type: types.DELETE_FILE,
        name,
        pwd,
        hierarchy
    };
}
export function renameFile(oldName, newName, pwd, hierarchy) {
    return {
        type: types.RENAME_FILE,
        oldName,
        newName,
        pwd,
        hierarchy
    };
}
export function createDirectory(pwd, hierarchy) {
    return {
        type: types.CREATE_DIRECTORY,
        pwd,
        hierarchy
    };
}
