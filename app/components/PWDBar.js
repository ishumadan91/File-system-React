import PropTypes from 'prop-types';
import React, {Component} from 'react';

export default class PWDBar extends Component {
    static propTypes = {
        pwd: PropTypes.string
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>{this.props.pwd}</p>
            </div>
        );
    }
}

