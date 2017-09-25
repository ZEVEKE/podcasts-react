import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Category = (props, context) => {
    const { categories } = context;
    const { isEdited, category, changeValue } = props;

    const options = categories.reduce((result, cur) => {
        const curList = cur.list.map((ctg) => (
            <option
                key = { ctg }
                label = { ctg }
                value = { ctg }
            />
        ));

        result.push(
            <optgroup
                key = { cur.group }
                label = { cur.group }>

                { curList }
            </optgroup>
        );

        return result;
    }, [<option key = 'dummy' label = '-- Select category --' />]);

    return isEdited ? (
        <div className = { Styles.category }>
            <div className = { Styles.styledSelect }>
                <select
                    name = 'category'
                    value = { category.name }
                    onChange = { changeValue }>
                    { options }
                </select>
            </div>
        </div>
    ) : (
        <div className = { Styles.category }>
            <span className = { Styles.caption }>Category: </span>
            <span>{ category.name }</span>
        </div>
    );
};

Category.contextTypes = {
    categories: PropTypes.array.isRequired
};

Category.propTypes = {
    category:    PropTypes.object.isRequired,
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired
};

export default Category;
