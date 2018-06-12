import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FilesList from '../components/FilesList';
import { changePWD, createDirectory, deleteFile, renameFile } from '../actions';
import PWDBar from '../components/PWDBar';
// import image from '../images/folder_icon.png';

const FileSystemWrapper = ({ hierarchy, pwd, onChangePWD, onCreateDirectory, onDeleteFile, onRenameFile}) => {
    return (
        <div>
            <PWDBar pwd={pwd} onChangePWD={onChangePWD} />
            <FilesList hierarchy={hierarchy} pwd={pwd} onCreateDirectory={() => onCreateDirectory(pwd, hierarchy)} onChangePWD={(newPwd) =>onChangePWD(newPwd)} onDeleteFile={(name) => onDeleteFile(name, pwd, hierarchy)} onRenameFile={(oldName, newName) => onRenameFile(oldName, newName, pwd, hierarchy)} />
        </div>
    );
};

FileSystemWrapper.propTypes = {
    hierarchy: PropTypes.object,
    pwd: PropTypes.string,
    onChangePWD: PropTypes.func,
    onCreateDirectory: PropTypes.func,
    onDeleteFile: PropTypes.func,
    onRenameFile: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        hierarchy: state.hierarchy,
        pwd: state.pwd
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangePWD: pwd => dispatch(changePWD(pwd)),
        onCreateDirectory: (pwd, hierarchy) => dispatch(createDirectory(pwd, hierarchy)),
        onDeleteFile: (name, pwd, hierarchy) => dispatch(deleteFile(name, pwd, hierarchy)),
        onRenameFile: (oldName, newName, pwd, hierarchy) => dispatch(renameFile(oldName, newName, pwd, hierarchy))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileSystemWrapper);
