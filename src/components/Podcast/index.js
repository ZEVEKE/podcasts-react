import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUniqueID, getCurrentTime } from '../../helpers';

import Episode from '../Episode';
import * as Fields from '../Fields';

import Styles from './styles.scss';

export default class Podcast extends Component {
    static contextTypes = {
        categories: PropTypes.array.isRequired,
        languages:  PropTypes.array.isRequired
    };

    static propTypes = {
        cancelMyself: PropTypes.func.isRequired,
        editMyself:   PropTypes.func.isRequired,
        returnToMain: PropTypes.func.isRequired,
        saveMyself:   PropTypes.func.isRequired,
        isEdited:     PropTypes.bool,
        isNew:        PropTypes.bool,
        podcast:      PropTypes.shape({
            author:      PropTypes.string,
            category:    PropTypes.object,
            complete:    PropTypes.bool,
            description: PropTypes.string,
            episodes:    PropTypes.array,
            explicit:    PropTypes.bool,
            id:          PropTypes.string,
            image:       PropTypes.string,
            language:    PropTypes.object,
            owner:       PropTypes.object,
            subtitle:    PropTypes.string,
            title:       PropTypes.string,
            vendor:      PropTypes.string
        })
    };

    static defaultProps = {
        podcast: {
            author:      '',
            category:    {},
            complete:    false,
            description: '',
            episodes:    [],
            explicit:    false,
            id:          '',
            image:       '',
            isEdited:    false,
            isNew:       false,
            language:    {},
            owner:       {},
            subtitle:    '',
            title:       '',
            vendor:      ''
        }
    };

    constructor () {
        super();

        // on element click handlers
        this.onCancelClicked = ::this._onCancelClicked;
        this.onEditPodcastClicked = ::this._onEditPodcastClicked;
        this.onReturnClicked = ::this._onReturnClicked;
        this.onSavePodcastClicked = ::this._onSavePodcastClicked;

        this.onAddEpisode = ::this._onAddEpisode;

        // on element change handlers
        this.deleteEpisode = ::this._deleteEpisode;
        this.episodeChanged = ::this._episodeChanged;
        this.onFieldChanged = ::this._onFieldChanged;

        this.checkField = ::this._checkField;
        this.saveEpisode = ::this._saveEpisode;
        this.editEpisode = ::this._editEpisode;
    }

    state = {
        author:      '',
        category:    {},
        complete:    false,
        description: '',
        episodes:    [],
        explicit:    false,
        image:       '',
        language:    {},
        ownerEmail:  '',
        ownerName:   '',
        subtitle:    '',
        title:       '',
        vendor:      ''
    };

    componentWillMount () {
        if (!this.props.isNew) {
            const {
                author,
                category,
                complete,
                description,
                episodes,
                explicit,
                image,
                language,
                owner,
                subtitle,
                title,
                vendor
            } = this.props.podcast;

            this.setState({
                author,
                category:   { ...category },
                complete,
                description,
                explicit,
                image,
                language:   { ...language },
                subtitle,
                title,
                vendor,
                ownerName:  owner.name,
                ownerEmail: owner.email,
                episodes:   episodes.map((episode) => ({
                    episode,
                    isEdited: false
                }))
            });
        }
    }

    componentWillReceiveProps (nextProps) {
        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            image,
            language,
            owner,
            subtitle,
            title,
            vendor
        } = nextProps.podcast;

        this.setState({
            author,
            category:   { ...category },
            complete,
            description,
            explicit,
            image,
            language:   { ...language },
            subtitle,
            title,
            vendor,
            ownerName:  owner.name,
            ownerEmail: owner.email,
            episodes:   episodes.map((episode) => ({
                episode,
                isEdited: false
            }))
        });
    }

    // Element click handlers

    _onAddEpisode () {
        this.setState((prevState) => {
            const { author, episodes } = prevState;

            return {
                episodes: [
                    ...episodes,
                    {
                        episode: {
                            author,
                            date: getCurrentTime(),
                            id:   getUniqueID(15)
                        },
                        isEdited: true
                    }
                ]
            };
        });
    }

    _onCancelClicked () {
        this.props.cancelMyself();
    }

    _onEditPodcastClicked () {
        this.props.editMyself();
    }

    _onReturnClicked () {
        const { returnToMain } = this.props;

        returnToMain();
    }

    _onSavePodcastClicked () {
        const { podcast: p, isNew, saveMyself } = this.props;
        let id = p.id;

        if (isNew && !id) {
            id = getUniqueID(15);
        }

        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            image,
            language,
            ownerEmail,
            ownerName,
            subtitle,
            title,
            vendor
        } = this.state;

        for (const item of episodes) {
            if (item.isEdited) {
                if (!this.saveEpisode(item.episode.id)) {
                    return;
                }
            }
        }

        try {
            this.checkField(author, 'Author');
            this.checkField(category.name, 'Category');
            this.checkField(description, 'Description');
            this.checkField(image, 'Image');
            this.checkField(language.id, 'Language');
            this.checkField(ownerEmail, 'Owner e-mail');
            this.checkField(ownerName, 'Owner name');
            this.checkField(subtitle, 'Subtitle');
            this.checkField(title, 'Title');
            this.checkField(vendor, 'Vendor');
        } catch (err) {
            alert(err.message); // eslint-disable-line

            return;
        }

        const podcast = {
            author,
            category,
            complete,
            description,
            episodes: episodes.map((item) => item.episode),
            explicit,
            id,
            image,
            language,
            owner:    {
                email: ownerEmail,
                name:  ownerName
            },
            subtitle,
            title,
            vendor
        };

        saveMyself({ ...podcast, id });
    }

    _checkField (property, propertyName) {
        if (!property) {
            throw new Error(`${propertyName} of podcast shouldn't be empty.`);
        }
    }

    // Element event handlers

    async _onFieldChanged (e) {
        const target = e.target;
        const targetName = target.name;
        const nextState = {};

        let reader = null;
        let value = null;

        switch (target.type) {
            case 'checkbox':
                value = target.checked;
                break;

            case 'file':
                reader = new FileReader();

                value = await new Promise((resolve) => {
                    reader.onload = (readerEvent) => {
                        resolve(readerEvent.target.result);
                    };
                    if (target.files[0]) {
                        reader.readAsDataURL(target.files[0]);
                    }
                });
                break;

            default:
                value = target.value;
                break;
        }

        switch (targetName) {
            case 'category':
                nextState.category = {};
                nextState.category.name = value === '-- Select category --' ? '' : value;
                nextState.category.group = this.context.categories.find((category) => category.list.indexOf(name) >= 0);

                break;

            case 'language':
                nextState.language = {};
                nextState.language.name = this.context.languages.find((lang) => lang.id === value) ?
                    this.context.languages.find((lang) => lang.id === value).name : '';
                nextState.language.id = value;
                break;

            default:
                nextState[targetName] = value;
                break;
        }

        this.setState((prevState) => {
            if (targetName === 'author') {
                nextState.episodes = prevState.episodes.map((item) => ({
                    episode: {
                        ...item.episode,
                        author: value
                    },
                    isEdited:       item.isEdited,
                    isParentEdited: item.isParentEdited
                }));
            }

            return nextState;
        });
    }

    // Eposode change handlers

    _episodeChanged (id, field, e /* optional */) {
        let value = null;

        if (field === 'explicit') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        this.setState((prevState) => ({
            episodes: prevState.episodes.map((item) => item.episode.id === id ?
                {
                    episode: {
                        ...item.episode,
                        [field]: field === 'date' ? getCurrentTime() : value
                    },
                    isEdited: item.isEdited
                } : item
            )
        }));
    }

    _deleteEpisode (id) {
        const { episodes } = this.state;

        this.setState({
            episodes: episodes.filter((item) => id !== item.episode.id)
        });
    }

    _editEpisode (id) {
        const { episodes } = this.state;
        const updatedEpisodes = episodes.map((item) => item.episode.id !== id ? item : {
            episode:  item.episode,
            isEdited: true
        });

        this.setState({
            episodes: updatedEpisodes
        });
    }

    _saveEpisode (id) {
        const { episodes } = this.state;
        let updatedEpisodes = [];

        if (!episodes.length) {
            return true;
        }

        try {
            updatedEpisodes = episodes.map((item) => {
                if (item.episode.id === id) {
                    if (!item.episode.description) {
                        throw new Error(`Description of episode shouldn't be empty`);
                    }

                    if (!item.episode.title) {
                        throw new Error(`Title of episode shouldn't be empty`);
                    }

                    return {
                        episode:  item.episode,
                        isEdited: false
                    };
                }

                return item;
            });
        } catch (err) {
            alert(err.message); // eslint-disable-line

            return false;
        }

        this.setState({
            episodes: updatedEpisodes
        });

        return true;
    }

    render () {
        const { isEdited, isNew } = this.props;
        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            image,
            language,
            ownerEmail,
            ownerName,
            subtitle,
            title,
            vendor
        } = this.state;

        // Buttons

        const btnAddEpisode = !complete && isEdited ? (
            <input
                className = { Styles.btnAddEpisode }
                key = 'addEpisode'
                type = 'button'
                value = 'New episode'
                onClick = { this.onAddEpisode }
            />
        ) : null;

        const btnEdit = !isEdited ? (
            <input
                className = { Styles.btnEdit }
                type = 'button'
                value = 'Edit'
                onClick = { this.onEditPodcastClicked }
            />
        ) : null;

        const btnCancel = isEdited && !isNew ? (
            <input
                className = { Styles.btnCancel }
                type = 'button'
                value = 'Cancel'
                onClick = { this.onCancelClicked }
            />
        ) : null;

        const btnReturn = !isEdited || isNew ? (
            <input
                className = { Styles.btnReturn }
                type = 'button'
                value = 'Return'
                onClick = { this.onReturnClicked }
            />
        ) : null;

        const btnSave = isEdited ? (
            <input
                className = { Styles.btnSave }
                type = 'button'
                value = 'Save'
                onClick = { this.onSavePodcastClicked }
            />
        ) : null;

        const episodesList = episodes.map((item) => (
            <li key = { item.episode.id }>
                <Episode
                    { ...item.episode }
                    deleteMyself = { this.deleteEpisode }
                    editMyself = { this.editEpisode }
                    fieldIsChanged = { this.episodeChanged }
                    isEdited = { item.isEdited }
                    isParentEdited = { isEdited }
                    saveMyself = { this.saveEpisode }
                />
            </li>
        ));

        return (
            <section className = { Styles.podcastComponent }>
                { btnCancel }
                { btnEdit }
                { btnReturn }
                { btnSave }
                <div className = { Styles.header }>
                    <Fields.Title
                        changeValue = { this.onFieldChanged }
                        isEdited = { isEdited }
                        title = { title }
                    />
                    <Fields.Subtitle
                        changeValue = { this.onFieldChanged }
                        isEdited = { isEdited }
                        subtitle = { subtitle }
                    />
                    <Fields.Author
                        author = { author }
                        changeValue = { this.onFieldChanged }
                        isEdited = { isEdited }
                    />
                </div>
                <div className = { Styles.padder }>
                    <div className = { Styles.leftStack }>
                        <Fields.Image
                            changeValue = { this.onFieldChanged }
                            image = { image }
                            isEdited = { isEdited }
                        />
                        <div className = { Styles.fields }>
                            <Fields.Vendor
                                changeValue = { this.onFieldChanged }
                                isEdited = { isEdited }
                                vendor = { vendor }
                            />
                            <Fields.Category
                                category = { category }
                                changeValue = { this.onFieldChanged }
                                isEdited = { isEdited }
                            />
                            <Fields.Language
                                changeValue = { this.onFieldChanged }
                                isEdited = { isEdited }
                                language = { language }
                            />
                            <Fields.Explicit
                                changeValue = { this.onFieldChanged }
                                explicit = { explicit }
                                isEdited = { isEdited }
                            />
                            <Fields.Complete
                                changeValue = { this.onFieldChanged }
                                complete = { complete }
                                isEdited = { isEdited }
                            />
                        </div>
                        <Fields.Owner
                            changeValue = { this.onFieldChanged }
                            isEdited = { isEdited }
                            owner = { {
                                email: ownerEmail,
                                name:  ownerName
                            } }
                        />
                    </div>
                    <div className = { Styles.centerStack } >
                        <Fields.Description
                            changeValue = { this.onFieldChanged }
                            description = { description }
                            isEdited = { isEdited }
                        />
                        <div className = { Styles.table }>
                            <div className = { Styles.headers }>
                                <span>Title</span>
                                <span>Description</span>
                                <span>Author</span>
                                <span>Released</span>
                                <span>Explicit</span>
                            </div>
                            <ul className = { Styles.rows } >
                                { episodesList }
                            </ul>
                            { btnAddEpisode }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
