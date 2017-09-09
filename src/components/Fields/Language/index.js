import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Language = (props, context) => {
    const { languages } = context;
    const { mode, language, changeValue } = props;
    const options = languages.reduce((newArr, lang) => {
        newArr.push(
            <option
                key = { lang.id }
                value = { lang.id }
                onChange = { this.onLanguageChanged }>

                { lang.name }
            </option>
        );

        return newArr;
    }, [<option key = 'dummy' />]);

    return (
        <div className = { Styles.language }>
            <span>Language: </span>
            {
                mode === 'edit' ? (
                    <select
                        required
                        value = { language }
                        onChange = { changeValue }>
                        { options }
                    </select>
                ) : language
            }
        </div>
    );
};

Language.contextTypes = {
    languages: PropTypes.array.isRequired
};

Language.propTypes = {
    changeValue: PropTypes.func.isRequired,
    language:    PropTypes.string.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Language;
