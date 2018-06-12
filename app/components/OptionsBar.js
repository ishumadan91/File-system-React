import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {optionsBarList} from '../styles/optionsBar.scss';

export default class OptionsBar extends Component {
    static propTypes = {
        triggerCreate: PropTypes.func,
        triggerDelete: PropTypes.func,
        triggerRename: PropTypes.func
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ul className={optionsBarList}>
                <li>
                    <a onClick={this.props.triggerCreate}>Create</a>
                </li>
                <li>
                    <a onClick={this.props.triggerDelete}>Delete</a>
                </li>
                <li>
                    <a onClick={this.props.triggerRename}>Rename</a>
                </li>
            </ul>
        );
    }
}

