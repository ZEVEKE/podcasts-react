import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Subtitle = (props) => {
    const { mode, subtitle, changeValue } = props;

    return mode === 'edit' ? (
        <h5 className = { `${Styles.subtitle} ${Styles.editMode}` }>
            <input
                required
                placeholder = 'Subtitle'
                type = 'text'
                value = { subtitle }
                onChange = { changeValue }
            />
        </h5>
    ) : <h5 className = { Styles.subtitle }>{ subtitle }</h5>;
};

Subtitle.propTypes = {
    changeValue: PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired,
    subtitle:    PropTypes.string.isRequired
};

export default Author;
