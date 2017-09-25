import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Complete = (props) => {
    const { isEdited, complete, changeValue } = props;
    const value = complete ? 'Yes' : 'No';

    return (
        <div className = { Styles.complete }>
            <span className = { Styles.caption }>Complete: </span>
            <input
                checked = { complete }
                className = { Styles.input }
                disabled = { !isEdited }
                name = 'complete'
                type = { isEdited ? 'checkbox' : 'text' }
                value = { value }
                onChange = { changeValue }
            />
        </div>
    );
};

Complete.propTypes = {
    changeValue: PropTypes.func.isRequired,
    complete:    PropTypes.bool.isRequired,
    isEdited:    PropTypes.bool.isRequired
};

export default Complete;
