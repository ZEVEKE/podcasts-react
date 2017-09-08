import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Category = (props) => {
    const { mode, category, options, changeValue } = props;
    const ctgOptions = options.reduce((pre, cur) => {
        const curList = cur.list.map((ctg) => (
            <option
                key = { ctg }
                label = { ctg }
                value = { ctg }
                onChange = { this.onCategoryChanged }
            />
        ));

        pre.push(
            <optgroup
                key = { cur.group }
                label = { cur.group }
                title = { cur.group }>

                { curList }
            </optgroup>
        );

        return pre;
    }, [<option key = '0' />]);

    return (
        <div className = { Styles.category }>
            <span>Category: </span>
            {
                mode === 'edit' ? (
                    <select
                        required
                        // name = 'ctg'
                        value = { category.name }
                        onChange = { changeValue }>

                        { ctgOptions }
                    </select>
                ) : category.name
            }
        </div>
    );
};

Category.propTypes = {
    category:    PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired,
    options:     PropTypes.array.isRequired
};

export default Category;
