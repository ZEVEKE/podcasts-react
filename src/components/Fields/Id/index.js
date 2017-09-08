import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Id = (props) => {
    const { mode, id, changeValue } = props;

    return (
        <div
            className = { `${Styles.id}
                    ${mode === 'edit' ? Styles.editMode : ''}`
            }>
            <span>Id:</span>
            {
                mode === 'edit' ? (
                    <input
                        required
                        placeholder = 'Id'
                        type = 'text'
                        value = { id }
                        onChange = { changeValue }
                    />
                ) : id
            }
        </div>
    );
};

Id.propTypes = {
    changeValue: PropTypes.func.isRequired,
    id:          PropTypes.string.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Id;
