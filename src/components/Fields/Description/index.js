import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Description = (props) => {
    const { mode, description, changeValue } = props;

    return (
        <div className = { Styles.description }>
            <h4>Description</h4>
            {
                mode === 'edit' ? (
                    <p className = { Styles.editMode }>
                        <textarea
                            required
                            placeholder = 'Description'
                            rows = '4'
                            type = 'text'
                            value = { description }
                            onChange = { changeValue }
                        />
                    </p>
                ) : (
                    <p>{ description }</p>
                )
            }
        </div>
    );
};

Description.propTypes = {
    changeValue: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Description;
