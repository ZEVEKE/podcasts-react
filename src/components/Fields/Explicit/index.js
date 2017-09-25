import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Explicit = (props) => {
    const { isEdited, explicit, changeValue } = props;

    return (
        <div className = { Styles.explicit }>
            <span className = { Styles.caption }>Explicit: </span>
            <input
                checked = { explicit }
                className = { Styles.input }
                disabled = { !isEdited }
                name = 'explicit'
                type = { isEdited ? 'checkbox' : 'text' }
                value = { explicit ? 'Yes' : 'No' }
                onChange = { changeValue }
            />
        </div>
    );
};

Explicit.propTypes = {
    changeValue: PropTypes.func.isRequired,
    explicit:    PropTypes.bool.isRequired,
    isEdited:    PropTypes.bool.isRequired
};

export default Explicit;
