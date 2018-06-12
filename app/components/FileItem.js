import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {fileItem, fileItemSelected} from '../styles/filesList.scss';

export default class FileItem extends Component {
    static propTypes = {
        name: PropTypes.string,
        selected: PropTypes.string,
        rename: PropTypes.bool,
        onClick: PropTypes.func,
        onDoubleClick: PropTypes.func,
        onRenameSubmit: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state = {
            formText: props.name
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({formText: nextProps.name});
    }
    componentDidUpdate(prevProps) {
        // debugger;
        if(this.props.rename && !prevProps.rename) {
            console.log('focus');
            this.textInput.focus();
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const value = this.state.formText.trim();
        if(value.length && value !== '..' && value.type !== 'up') {
            this.props.onRenameSubmit(value);
        } else {
            this.setState({formText: this.props.name});
        }
    }
    render() {
        const className = fileItem + (this.props.selected === this.props.name ? ' ' + fileItemSelected : '');
        let element;
        if(this.props.selected === this.props.name && this.props.rename) {
            element = <form onSubmit={this.onSubmit.bind(this)}><input value={this.state.formText} ref={(node) => {this.textInput = node;}} onChange={(e) => this.setState({formText: e.target.value})}></input></form>;
        } else {
            element = <a onDoubleClick = {this.props.onDoubleClick} onClick={this.props.onClick}>{this.props.name}</a>;
        }
        return (
            <li className={className}>
                {element}
            </li>
        );
    }
}
