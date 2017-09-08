import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { getCurrentTime } from '../../helpers';

import Styles from './styles.scss';

export default class Episode extends Component {
    static propTypes = {
        author:       PropTypes.string.isRequired,
        date:         PropTypes.string.isRequired,
        deleteMyself: PropTypes.func.isRequired,
        description:  PropTypes.string.isRequired,
        editMyself:   PropTypes.func.isRequired,
        explicit:     PropTypes.bool.isRequired,
        id:           PropTypes.string.isRequired,
        mode:         PropTypes.string.isRequired,
        parentMode:   PropTypes.string.isRequired,
        saveMyself:   PropTypes.func.isRequired,
        title:        PropTypes.string.isRequired
    };

    constructor () {
        super();
        this.onEditClicked = ::this._onEditClicked;
        this.onDeleteClicked = ::this._onDeleteClicked;
        this.onSaveClicked = ::this._onSaveClicked;

        this.onExplicitChanged = ::this._onExplicitChanged;
        this.onDescriptionChanged = ::this._onDescriptionChanged;
        this.onIdChanged = ::this._onIdChanged;
        this.onTitleChanged = ::this._onTitleChanged;

        this.getNewEpisodeValues = ::this._getNewEpisodeValues;
    }

    state = {
        author:      '',
        date:        '',
        description: '',
        explicit:    false,
        id:          '',
        mode:        'normal',
        parentMode:  '',
        title:       ''
    };

    componentWillMount () {
        const {
            author,
            date,
            description,
            explicit,
            id,
            mode,
            title
        } = this.props;

        if (!date && mode === 'edit') {
            this.updateDate = setInterval(() => this.setState({ date: getCurrentTime() }), 1000);
        }

        this.setState({
            author,
            date: moment(date).format('l'),
            description,
            explicit,
            id,
            mode,
            title
        });
    }

    componentWillUnmount () {
        if (this.updateDate !== null) {
            clearInterval(this.updateDate);
        }
    }

    // On button click handlers
    _onDeleteClicked () {
        const { id, deleteMyself } = this.props;

        deleteMyself(id);
    }

    _onEditClicked () {
        const { editMyself, id } = this.props;

        this.getNewEpisodeValues();
        editMyself(id);
        this.setState({ mode: 'edit' });
    }

    _onSaveClicked () {
        const { saveMyself, id: oldId } = this.props;
        const { id, title, description, author, date, explicit } = this.state;

        if (!id) {
            throw new Error(`id should be not empty`);
        }

        if (!title) {
            throw new Error(`title should be not empty`);
        }

        if (!description) {
            throw new Error(`description should be not empty`);
        }

        saveMyself(
            oldId,
            {
                author,
                date,
                description,
                explicit,
                id,
                title
            }
        );

        this.setState({ mode: 'normal ' });
    }


    // other functions

    _getNewEpisodeValues () {
        const {
            author,
            description,
            explicit,
            id,
            title
        } = this.state;

        return {
            author,
            description,
            explicit,
            id,
            title
        };
    }


    // on element event handlers

    _onIdChanged (event) {
        this.setState({
            id: event.target.value
        });
    }

    _onTitleChanged (event) {
        this.setState({
            title: event.target.value
        });
    }

    _onDescriptionChanged (event) {
        this.setState({
            description: event.target.value
        });
    }

    _onExplicitChanged (event) {
        this.setState({
            explicit: event.target.checked
        });
    }

    // Render

    render () {
        const { id, title, description, author, explicit, date, mode: ownMode } = this.state;
        const { parentMode } = this.props;

        // Buttons

        const btnDelete = parentMode === 'edit' ? (
            <input
                className = { Styles.delete }
                type = 'button'
                onClick = { this.onDeleteClicked }
            />
        ) : null;

        const btnEdit = parentMode === 'edit' && ownMode === 'normal' ? (
            <input
                className = { Styles.edit }
                type = 'button'
                onClick = { this.onEditClicked }
            />
        ) : null;

        const btnSave = parentMode === 'edit' && ownMode === 'edit' ? (
            <input
                className = { Styles.save }
                type = 'button'
                onClick = { this.onSaveClicked }
            />
        ) : null;

        // Elements

        const authorElement = (
            <span className = { Styles.author }>
                { author }
            </span>
        );

        const idElement = (
            <span className = { Styles.id }>
                {
                    ownMode === 'edit' ? (
                        <input
                            placeholder = 'Id'
                            type = 'text'
                            value = { id }
                            onChange = { this.onIdChanged }
                        />
                    ) : id
                }
            </span>
        );

        const dateElement = (
            <span className = { Styles.date }>
                { date }
            </span>
        );

        const descriptionElement = (
            <span className = { Styles.description }>
                {
                    ownMode === 'edit' ? (
                        <input
                            placeholder = 'description'
                            type = 'text'
                            value = { description }
                            onChange = { this.onDescriptionChanged }
                        />
                    ) : description
                }
            </span>
        );

        const explicitElement = (
            <span className = { Styles.explicit }>
                {
                    ownMode === 'edit' ? (
                        <input
                            type = 'checkbox'
                            value = { explicit }
                            onChange = { this.onExplicitChanged }
                        />
                    ) : explicit ? 'Yes' : 'No'
                }
            </span>
        );

        const titleElement = (
            <span className = { Styles.title }>
                {
                    ownMode === 'edit' ? (
                        <input
                            placeholder = 'Title'
                            type = 'text'
                            value = { title }
                            onChange = { this.onTitleChanged }
                        />
                    ) : title
                }
            </span>
        );

        return (
            <div className = { Styles.episodeComponent }>
                { btnEdit }
                { btnSave }
                { idElement }
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
