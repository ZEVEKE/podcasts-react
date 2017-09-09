import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Explicit = (props) => {
    const { mode, explicit, changeValue } = props;

    return (
        <div
            className = { `${Styles.explicit}
                    ${mode === 'edit' ? Styles.editMode : ''}`
            }>
            <span>Explicit: </span>
            {
                mode === 'edit' ? (
                    <input
                        checked = { explicit }
                        type = 'checkbox'
                        onChange = { changeValue }
                    />
                ) : explicit ? 'Yes' : 'No'
            }
        </div>
    );
};

Explicit.propTypes = {
    changeValue: PropTypes.func.isRequired,
    explicit:    PropTypes.bool.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Explicit;
