import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const Vendor = (props) => {
    const { mode, vendor, changeValue } = props;

    return (
        <div className = { `${Styles.vendor} ${Styles.editMode}` }>
            <span>Vendor:</span>
            {
                mode === 'edit' ? (
                    <input
                        required
                        placeholder = 'Vendor'
                        type = 'text'
                        value = { vendor }
                        onChange = { changeValue }
                    />
                ) : vendor
            }
        </div>
    );
};

Vendor.propTypes = {
    changeValue: PropTypes.func.isRequired,
    mode:        PropTypes.string.isRequired,
    vendor:      PropTypes.string.isRequired
};

export default Vendor;
