import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';

const Owner = (props) => {
    const { isEdited, owner, changeValue } = props;
    const inputStyle = cx({
        [Styles.input]:    true,
        [Styles.isEdited]: isEdited
    });

    const componentStyle = cx({
        [Styles.owner]:    true,
        [Styles.isEdited]: isEdited
    });

    return (
        <div className = { componentStyle }>
            <h5>Added by</h5>
            <div>
                <input
                    required
                    className = { inputStyle }
                    disabled = { !isEdited }
                    name = 'ownerName'
                    placeholder = 'Name'
                    type = 'text'
                    value = { owner.name }
                    onChange = { changeValue }
                />
            </div>
            <div>
                <input
                    required
                    className = { inputStyle }
                    disabled = { !isEdited }
                    name = 'ownerEmail'
                    placeholder = 'E-Mail'
                    type = 'email'
                    value = { owner.email }
                    onChange = { changeValue }
                />
            </div>
        </div>
    );
};

Owner.propTypes = {
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired,
    owner:       PropTypes.object.isRequired
};

export default Owner;
