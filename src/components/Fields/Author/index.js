import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';

const Author = (props) => {
    const { isEdited, author, changeValue } = props;
    const inputStyle = cx({
        [Styles.input]:    true,
        [Styles.isEdited]: isEdited
    });

    return (
        <h2 className = { Styles.author }>
            <input
                required
                className = { inputStyle }
                disabled = { !isEdited }
                name = 'author'
                placeholder = 'Author'
                type = 'text'
                value = { author }
                onChange = { changeValue }
            />
        </h2>
    );
};

Author.propTypes = {
    author:      PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired
};

export default Author;
