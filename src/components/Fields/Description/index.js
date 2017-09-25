import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';

const Description = (props) => {
    const { isEdited, description, changeValue } = props;
    const textareaStyle = cx({
        [Styles.textarea]: true,
        [Styles.isEdited]: isEdited
    });

    return (
        <div className = { Styles.description }>
            <h4>Description</h4>
            <textarea
                required
                className = { textareaStyle }
                disabled = { !isEdited }
                name = 'description'
                placeholder = 'Description'
                rows = '4'
                type = 'text'
                value = { description }
                onChange = { changeValue }
            />
        </div>
    );
};

Description.propTypes = {
    changeValue: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    isEdited:    PropTypes.bool.isRequired
};

export default Description;
