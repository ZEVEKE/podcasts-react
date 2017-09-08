import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Owner = (props) => {
    const { mode, owner, changeName, changeEmail } = props;

    return (
        <div
            className = {
                `${Styles.owner}
                    ${mode === 'edit' ? Styles.editMode : ''}`
            }>
            <h5>Added by</h5>
            <div>
                {
                    mode === 'edit' ? (
                        <input
                            required
                            placeholder = 'Name'
                            type = 'text'
                            value = { owner.name }
                            onChange = { changeName }
                        />
                    ) : owner.name
                }
            </div>
            <div>
                {
                    mode === 'edit' ? (
                        <input
                            required
                            placeholder = 'E-Mail'
                            type = 'email'
                            value = { owner.email }
                            onChange = { changeEmail }
                        />
                    ) : owner.email
                }
            </div>
        </div>
    );
};

Owner.propTypes = {
    changeEmail: PropTypes.func.isRequired,
    changeName:  PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired,
    owner:       PropTypes.string.isRequired
};

export default Owner;
