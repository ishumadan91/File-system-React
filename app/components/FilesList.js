import PropTypes from 'prop-types';
import React, {Component} from 'react';
import FileItem from './FileItem';
import OptionsBar from './OptionsBar';
import {getHierarchyObject} from '../utils';
import {filesList} from '../styles/filesList.scss';

export default class FilesList extends Component {
    static propTypes = {
        hierarchy: PropTypes.object,
        pwd: PropTypes.string,
        onChangePWD: PropTypes.func,
        onCreateDirectory: PropTypes.func,
        onDeleteFile: PropTypes.func,
        onRenameFile: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            sortBy: 'name',
            sortOrder: 'Asc',
            selected: '',
            rename: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.pwd !== nextProps.pwd) {
            this.setState({rename: false, selected: ''});
        }
    }
    onDelete() {
        if(this.state.selected && this.state.selected !== this.upItem.name) {
            this.props.onDeleteFile(this.state.selected);
        }
    }
    onRenameTrigger() {
        if(this.state.selected && this.state.selected !== this.upItem.name) {
            this.setState({rename: true});
        }
    }
    onRenameSubmit(item, newName) {
        this.props.onRenameFile(item.name, newName);
        this.setState({selected: newName, rename: false});
    }
    onClickItem(item) {
        this.setState({selected: item.name});
    }
    onDoubleClickItem(item) {
        let newPwd = this.props.pwd;
        if(item.type === 'up') {
            if(this.props.pwd !== '/') {
                const lastIndex = this.props.pwd.lastIndexOf('/');
                newPwd = this.props.pwd.substr(0, lastIndex);
                if(!newPwd) {
                    newPwd = '/';
                }
            }
        } else {
            newPwd += (this.props.pwd === '/' ? '' : '/') + item.name;
        }
        this.props.onChangePWD(newPwd);
    }
    upItem = {
        name: '..',
        type: 'up'
    }
    render() {
        let elems = [
            <FileItem key={this.upItem.name} selected={this.state.selected} onClick={this.onClickItem.bind(this, this.upItem)} onDoubleClick={this.onDoubleClickItem.bind(this, this.upItem)} {...this.upItem} />
        ];
        const hierarchyObj = getHierarchyObject(this.props.pwd, this.props.hierarchy);
        hierarchyObj.files.forEach((item) =>{
            elems.push(<FileItem key={item.name} selected={this.state.selected} rename={this.state.rename} onClick={this.onClickItem.bind(this, item)} onDoubleClick={this.onDoubleClickItem.bind(this, item)} onRenameSubmit={this.onRenameSubmit.bind(this, item)} {...item} />);
        });
        return (
            <div>
                <OptionsBar triggerCreate={this.props.onCreateDirectory} triggerDelete={this.onDelete.bind(this)} triggerRename={this.onRenameTrigger.bind(this)}  />
                <ul className={filesList}>
                    {elems}
                </ul>
            </div>
        );
    }
}
