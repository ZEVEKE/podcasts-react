import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Language = (props) => {
    const { mode, language, options, changeValue } = props;
    const langOptions = options.reduce((newArr, lang) => {
        newArr.push(
            <option
                key = { lang.id }
                value = { lang.id }
                onChange = { this.onLanguageChanged }>

                { lang.name }
            </option>
        );

        return newArr;
    }, [<option key = '0' />]);

    return (
        <div className = { Styles.language }>
            <span>Language: </span>
            {
                mode === 'edit' ? (
                    <select
                        required
                        // name = 'lang'
                        value = { language }
                        onChange = { changeValue }>
                        { langOptions }
                    </select>
                ) : language
            }
        </div>
    );
};

Language.propTypes = {
    changeValue: PropTypes.func.isRequired,
    language:    PropTypes.string.isRequired,
    mode:        PropTypes.string.isRequired,
    options:     PropTypes.array.isRequired
};

export default Language;
