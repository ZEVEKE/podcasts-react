import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';

const Subtitle = (props) => {
    const { isEdited, subtitle, changeValue } = props;
    const inputStyle = cx({
        [Styles.input]:    true,
        [Styles.isEdited]: isEdited
    });

    return (
        <h5 className = { Styles.subtitle }>
            <input
                required
                className = { inputStyle }
                disabled = { !isEdited }
                name = 'subtitle'
                placeholder = 'Subtitle'
                type = 'text'
                value = { subtitle }
                onChange = { changeValue }
            />
        </h5>
    );
};

Subtitle.propTypes = {
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired,
    subtitle:    PropTypes.string.isRequired
};

export default Subtitle;
