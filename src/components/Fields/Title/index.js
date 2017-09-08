import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Title = (props) => {
    const { mode, title, changeValue } = props;

    return mode === 'edit' ? (
        <h1 className = { `${Styles.title} ${Styles.editMode}` }>
            <input
                required
                placeholder = 'Title'
                type = 'text'
                value = { title }
                onChange = { changeValue }
            />
        </h1>
    ) : <h1 className = { Styles.title }>{ title }</h1>;
};

Title.propTypes = {
    changeValue: PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired,
    title:       PropTypes.string.isRequired
};

export default Title;
