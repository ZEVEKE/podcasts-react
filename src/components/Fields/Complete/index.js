import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Complete = (props) => {
    const { mode, complete, changeValue } = props;

    return (
        <div
            className = { `${Styles.complete}
                    ${mode === 'edit' ? Styles.editMode : ''}`
            }>
            <span>Complete: </span>
            {
                mode === 'edit' ? (
                    <input
                        checked = { complete }
                        type = 'checkbox'
                        onChange = { changeValue }
                    />
                ) : complete ? 'Yes' : 'No'
            }
        </div>
    );
};

Complete.propTypes = {
    changeValue: PropTypes.func.isRequired,
    complete:    PropTypes.string.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Complete;
