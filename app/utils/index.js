export function getHierarchyObject(pwd, hierarchy) {
    let curr;
    if(pwd === '/') {
        curr = hierarchy;
    } else {
        let arr = pwd.split('/');
        arr = arr.slice(1);
        let obj = hierarchy;
        arr.forEach((item) => {
            const files = obj.files;
            for(let i = 0; i < files.length; i++) {
                if(files[i].name === item && files[i].type === 'directory') {
                    obj = files[i];
                    break;
                }
            }
        });
        curr = obj;
    }
    return curr;
}
export function addDirectory({pwd, hierarchy}) {
    const dir = getHierarchyObject(pwd, hierarchy);
    if(dir) {
        const files = dir.files;
        let untitledFound = false;
        let counter = 1;
        let newFileName = '';
        do {
            newFileName = counter > 1 ? 'untitled ' + counter : 'untitled';
            let found = false;
            for(let i = 0; i < files.length; i++) {
                if(files[i].name === newFileName && files[i].type === 'directory') {
                    found = true;
                    break;
                }
            }
            if(!found) {
                untitledFound = true;
            }
            counter++;
        } while(!untitledFound);
        dir.files.push({
            name: newFileName,
            type: 'directory',
            files: []
        });
    }
    return Object.assign({}, hierarchy);
}
export function renameFile({oldName, newName, pwd, hierarchy}) {
    const dir = getHierarchyObject(pwd, hierarchy);
    for(let i = 0; i < dir.files.length; i++) {
        if(dir.files[i].name === oldName) {
            dir.files[i].name = newName;
            break;
        }
    }
    return Object.assign({}, hierarchy);
}
export function deleteFile({name, pwd, hierarchy}) {
    const dir = getHierarchyObject(pwd, hierarchy);
    let i = 0;
    for(; i < dir.files.length; i++) {
        if(dir.files[i].name === name) {
            break;
        }
    }
    dir.files = dir.files.slice(0, i).concat(dir.files.slice(i + 1));
    return Object.assign({}, hierarchy);
}
