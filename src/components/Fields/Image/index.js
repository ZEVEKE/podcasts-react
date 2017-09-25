import React from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';

import Styles from './styles.scss';
import chooseCover from '../../../theme/assets/choose-image.png';

const Image = (props) => {
    let chooseImage = null;

    const onImageClicked = () => {
        chooseImage.click();
    };

    const { isEdited, image, changeValue } = props;

    const componentStyle = cx({
        [Styles.imageComponent]: true,
        [Styles.isEdited]:       isEdited
    });

    return isEdited ? (
        <div className = { componentStyle }>
            <img
                className = { Styles.image }
                src = { image }
            />
            <img
                className = { Styles.chooseCover }
                src = { chooseCover }
                onClick = { onImageClicked }
            />
            <input
                accept = '.png, .jpg, .jpeg'
                name = 'image'
                ref = { (chImg) => chooseImage = chImg }
                type = 'file'
                onChange = { changeValue }
            />
        </div>
    ) : (
        <div className = { componentStyle }>
            <img
                className = { Styles.image }
                src = { image }
            />
        </div>
    );
};

Image.propTypes = {
    changeValue: PropTypes.func.isRequired,
    image:       PropTypes.string.isRequired,
    isEdited:    PropTypes.bool.isRequired
};

export default Image;
