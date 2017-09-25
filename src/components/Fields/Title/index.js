import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';

const Title = (props) => {
    const { isEdited, title, changeValue } = props;
    const inputStyle = cx({
        [Styles.input]:    true,
        [Styles.isEdited]: isEdited
    });

    return (
        <h1 className = { Styles.title }>
            <input
                required
                className = { inputStyle }
                disabled = { !isEdited }
                name = 'title'
                placeholder = 'Title'
                type = 'text'
                value = { title }
                onChange = { changeValue }
            />
        </h1>
    );
};

Title.propTypes = {
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired,
    title:       PropTypes.string.isRequired
};

export default Title;
