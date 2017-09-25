import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Language = (props, context) => {
    const { languages } = context;
    const { isEdited, language, changeValue } = props;
    const options = languages.reduce((result, lang) => {
        result.push(
            <option
                key = { lang.id }
                label = { lang.name }
                value = { lang.id }
            />
        );

        return result;
    }, [<option key = 'dummy' label = '-- Select category --' />]);

    return isEdited ? (
        <div className = { Styles.language }>
            <div className = { Styles.styledSelect }>
                <select
                    name = 'language'
                    value = { language.id }
                    onChange = { changeValue }>
                    { options }
                </select>
            </div>
        </div>
    ) : (
        <div className = { Styles.language }>
            <span className = { Styles.caption }>Language: </span>
            <span>{ language.name } </span>
        </div>
    );
};

Language.contextTypes = {
    languages: PropTypes.array.isRequired
};

Language.propTypes = {
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired,
    language:    PropTypes.object.isRequired
};

export default Language;
