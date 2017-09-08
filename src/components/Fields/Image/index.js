import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';
import chooseCover from '../../../theme/assets/choose-image.png';

class Image extends Component {
    static propTypes = {
        changeValue: PropTypes.func.isRequired,
        image:       PropTypes.string.isRequired,
        mode:        PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.onImageClicked = ::this._onImageClicked;
    }

    _onImageClicked () {
        this.chooseImage.click();
    }

    render () {
        const { mode, image, changeValue } = this.props;

        return mode === 'edit' ? (
            <div className = { `${Styles.imageComponent} ${Styles.editMode}` }>
                <img
                    className = { Styles.image }
                    src = { image }
                    onClick = { this.onImageClicked }
                />
                <img
                    className = { Styles.chooseCover }
                    src = { chooseCover }
                    onClick = { this.onImageClicked }
                />
                <input
                    accept = '.png, .jpg, .jpeg'
                    name = 'chooseImage'
                    ref = { (chImg) => this.chooseImage = chImg }
                    type = 'file'
                    onChange = { changeValue }
                />
            </div>
        ) : (
            <div className = { Styles.imageComponent }>
                <img src = { image } />
            </div>
        );
    }
}

export default Image;
