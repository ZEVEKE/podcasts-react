import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Category = (props, context) => {
    const { categories } = context;
    const { mode, category, changeValue } = props;
    const options = categories.reduce((pre, cur) => {
        const curList = cur.list.map((ctg) => (
            <option
                key = { ctg }
                label = { ctg }
                value = { `${cur.group}|${ctg}` }
            />
        ));

        pre.push(
            <optgroup
                key = { cur.group }
                label = { cur.group }>

                { curList }
            </optgroup>
        );

        return pre;
    }, [<option key = 'dummy' />]);

    return (
        <div className = { Styles.category }>
            <span>Category: </span>
            {
                mode === 'edit' ? (
                    <select
                        required
                        label = { category.name }
                        onChange = { changeValue }>

                        { options }
                    </select>
                ) : category.name
            }
        </div>
    );
};

Category.contextTypes = {
    categories: PropTypes.array.isRequired
};

Category.propTypes = {
    category:    PropTypes.object.isRequired,
    changeValue: PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired
};

export default Category;
