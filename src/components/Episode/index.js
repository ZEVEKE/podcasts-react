import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cx from 'class-names';
import moment from 'moment';

import Styles from './styles.scss';

export default class Episode extends Component {
    static propTypes = {
        deleteMyself:   PropTypes.func.isRequired,
        editMyself:     PropTypes.func.isRequired,
        fieldIsChanged: PropTypes.func.isRequired,
        id:             PropTypes.string.isRequired,
        isEdited:       PropTypes.bool.isRequired,
        isParentEdited: PropTypes.bool.isRequired,
        saveMyself:     PropTypes.func.isRequired,
        author:         PropTypes.string,
        date:           PropTypes.string,
        description:    PropTypes.string,
        explicit:       PropTypes.bool,
        title:          PropTypes.string
    };

    static defaultProps = {
        author:         '',
        date:           '',
        description:    '',
        explicit:       false,
        title:          '',
        isParentEdited: false
    };

    constructor () {
        super();
        this.onDeleteClicked = ::this._onDeleteClicked;
        this.onEditClicked = ::this._onEditClicked;
        this.onSaveClicked = ::this._onSaveClicked;
    }

    componentWillMount () {
        const {
            date,
            id,
            fieldIsChanged,
            isEdited
        } = this.props;

        if (!date && isEdited) {
            this.updateDateTimer = setInterval(() => fieldIsChanged(id, 'date'), 1000);
        }
    }

    shouldComponentUpdate (nextProps) {
        let needUpdate = false;

        for (const key in nextProps) {
            if (nextProps.hasOwnProperty(key)) {
                if (nextProps[key] !== this.props[key]) {
                    needUpdate = true;
                    break;
                }
            }
        }

        return needUpdate;
    }

    // On button click handlers

    _onDeleteClicked () {
        const { deleteMyself, id } = this.props;

        if (this.updateDateTimer) {
            clearInterval(this.updateDateTimer);
        }

        deleteMyself(id);
    }

    _onEditClicked () {
        const { id, editMyself } = this.props;

        if (this.updateDateTimer) {
            clearInterval(this.updateDateTimer);
        }

        editMyself(id);
    }

    _onSaveClicked () {
        const { id, saveMyself } = this.props;

        if (this.updateDateTimer) {
            clearInterval(this.updateDateTimer);
        }

        saveMyself(id);
    }

    // Render

    render () {
        const {
            author,
            date,
            description,
            explicit,
            fieldIsChanged,
            id,
            isParentEdited,
            isEdited,
            title
        } = this.props;

        // Buttons

        const btnDelete = isParentEdited ? (
            <input
                className = { Styles.delete }
                type = 'button'
                onClick = { this.onDeleteClicked }
            />
        ) : null;

        const btnEdit = isParentEdited && !isEdited ? (
            <input
                className = { Styles.edit }
                type = 'button'
                onClick = { this.onEditClicked }
            />
        ) : null;

        const btnSave = isEdited ? (
            <input
                className = { Styles.save }
                type = 'button'
                onClick = { this.onSaveClicked }
            />
        ) : null;

        // Elements

        const authorElement = (
            <span>
                { author }
            </span>
        );

        const dateElement = (
            <span>
                { moment(date).format('LTS') }
            </span>
        );

        const descriptionElement = (
            <span>
                <input
                    className = { Styles.input }
                    disabled = { !isEdited || !isParentEdited }
                    placeholder = 'description'
                    type = 'text'
                    value = { description }
                    onChange = { (e) => fieldIsChanged(id, 'description', e) }
                />
            </span>
        );

        const explicitElement = (
            <span className = { Styles.explicit }>
                <input
                    checked = { explicit }
                    className = { Styles.input }
                    disabled = { !isEdited }
                    type = { isEdited ? 'checkbox' : 'text' }
                    value = { explicit ? 'Yes' : 'No' }
                    onChange = { (e) => fieldIsChanged(id, 'explicit', e) }
                />
            </span>
        );

        const titleElement = (
            <span>
                <input
                    className = { Styles.input }
                    disabled = { !isEdited || !isParentEdited }
                    placeholder = 'Title'
                    type = 'text'
                    value = { title }
                    onChange = { (e) => fieldIsChanged(id, 'title', e) }
                />
            </span>
        );

        const episodeStyle = cx({
            [Styles.episodeComponent]: true,
            [Styles.isEdited]:         isEdited
        });

        return (
            <div className = { episodeStyle }>
                { btnEdit }
                { btnSave }
                { titleElement }
                { descriptionElement }
                { authorElement }
                { dateElement }
                { explicitElement }
                { btnDelete }
            </div>
        );
    }
}
