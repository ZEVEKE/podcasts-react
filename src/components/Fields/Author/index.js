import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Author = (props) => {
    const { mode, author, changeValue } = props;

    return mode === 'edit' ? (
        <h2 className = { `${Styles.author} ${Styles.editMode}` }>
            <input
                required
                placeholder = 'Author'
                type = 'text'
                value = { author }
                onChange = { changeValue }
            />
        </h2>
    ) : <h2 className = { Styles.author }>{ author }</h2>;
};

Author.propTypes = {
    author:      PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Author;
