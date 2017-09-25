import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';

const Vendor = (props) => {
    const { isEdited, vendor, changeValue } = props;
    const inputStyle = cx({
        [Styles.input]:    true,
        [Styles.isEdited]: isEdited
    });

    return (
        <div className = { Styles.vendor }>
            <span className = { Styles.caption }>Vendor:</span>
            <input
                required
                className = { inputStyle }
                disabled = { !isEdited }
                name = 'vendor'
                placeholder = 'Vendor'
                type = 'text'
                value = { vendor }
                onChange = { changeValue }
            />
        </div>
    );
};

Vendor.propTypes = {
    changeValue: PropTypes.func.isRequired,
    isEdited:    PropTypes.bool.isRequired,
    vendor:      PropTypes.string.isRequired
};

export default Vendor;
