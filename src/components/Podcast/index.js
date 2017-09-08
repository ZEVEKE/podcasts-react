import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { categories, emptyEpisode, languages } from '../Mock';

import Episode from '../Episode';
import * as Fields from '../Fields';
import Styles from './styles.scss';

export default class Podcast extends Component {
    static propTypes = {
        mode:    PropTypes.string.isRequired,
        podcast: PropTypes.shape({
            author:      PropTypes.string.isRequired,
            category:    PropTypes.object.isRequired,
            complete:    PropTypes.bool.isRequired,
            description: PropTypes.string.isRequired,
            episodes:    PropTypes.array.isRequired,
            explicit:    PropTypes.bool.isRequired,
            id:          PropTypes.string.isRequired,
            image:       PropTypes.string.isRequired,
            language:    PropTypes.string.isRequired,
            owner:       PropTypes.object.isRequired,
            subtitle:    PropTypes.string.isRequired,
            title:       PropTypes.string.isRequired,
            vendor:      PropTypes.string.isRequired
        })
    };

    constructor () {
        super();

        // on element click handlers
        this.onDeleteEpisodeClicked = ::this._onDeleteEpisodeClicked;
        this.onEditPodcastClicked = ::this._onEditPodcastClicked;
        this.onSavePodcastClicked = ::this._onSavePodcastClicked;
        this.onCancelClicked = ::this._onCancelClicked;
        // this.onImageClicked = ::this._onImageClicked;

        this.onAddEpisode = ::this._onAddEpisode;

        // on element change handlers
        this.onAuthorChanged = ::this._onAuthorChanged;
        this.onCategoryChanged = ::this._onCategoryChanged;
        this.onCompleteChanged = ::this._onCompleteChanged;
        this.onDescriptionChanged = ::this._onDescriptionChanged;
        this.deleteEpisode = ::this._deleteEpisode;
        this.onExplicitChanged = ::this._onExplicitChanged;
        this.onIdChanged = ::this._onIdChanged;
        this.onImageChanged = ::this._onImageChanged;
        this.onLanguageChanged = ::this._onLanguageChanged;
        this.onOwnerNameChanged = ::this._onOwnerNameChanged;
        this.onOwnerEmailChanged = ::this._onOwnerEmailChanged;
        this.onSubtitleChanged = ::this._onSubtitleChanged;
        this.onTitleChanged = ::this._onTitleChanged;
        this.onVendorChanged = ::this._onVendorChanged;

        this.getNewPodcastValues = ::this._getNewPodcastValues;
        this.restoreSavedPodcastChanges = ::this._restoreSavedPodcastChanges;
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
        id:          '',
        image:       '',
        language:    '',
        mode:        'normal',
        owner:       {},
        subtitle:    '',
        title:       '',
        vendor:      ''
    };

    componentWillMount () {
        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            id,
            image,
            language,
            owner,
            subtitle,
            title,
            vendor
        } = this.props.podcast;
        const { mode } = this.props;

        this.setState({
            author,
            category,
            complete,
            description,
            episodes: episodes.map((episode) => ({
                episode,
                mode: 'normal'
            })),
            // episodes,
            explicit,
            id,
            image,
            language,
            lastSavedPodcast: this.props.podcast,
            mode,
            owner,
            subtitle,
            title,
            vendor
        });
    }


    // on element click handlers

    _onAddEpisode () {
        const { episodes } = this.state;

        console.log(episodes);
        episodes.push(<Episode { ...emptyEpisode } />);

        console.log(episodes);
        this.setState ({ episodes });
        console.log(this.state.episodes);
    }

    _onCancelClicked () {
        this.restoreSavedPodcastChanges();
        this.setState({ mode: 'normal' });
    }

    _onDeleteEpisodeClicked (delEp) {
        const { episodes } = this.state;

        this.setState({
            episodes: episodes.filter((ep) => ep === delEp)
        });
    }

    _onEditPodcastClicked () {
        this.getNewPodcastValues();
        this.setState({ mode: 'edit' });
    }

    _onSavePodcastClicked () {
        const changedPodcast = this.getNewPodcastValues();

        this.setState({
            mode:             'normal',
            lastSavedPodcast: changedPodcast
        });
    }


    // on element event handlers

    _onAuthorChanged (e) {
        this.setState({
            author: e.target.value
        });
    }

    _onCategoryChanged (e) {
        const { group } = this.state.category;

        this.setState({
            category: {
                group,
                name: e.target.value
            }
        });
    }

    _onCompleteChanged (e) {
        this.setState({
            complete: e.target.checked
        });
    }

    _onDescriptionChanged (e) {
        this.setState({
            description: e.target.value
        });
    }

    _onExplicitChanged (e) {
        this.setState({
            explicit: e.target.checked
        });
    }

    _onIdChanged (e) {
        this.setState({
            id: e.target.value
        });
    }

    _onImageChanged (inputEvent) {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
            const image = readerEvent.target.result;

            this.setState({
                image
            });
        };
        reader.readAsDataURL(inputEvent.target.files[0]);
    }

    _onLanguageChanged (e) {
        this.setState({
            language: e.target.value
        });
    }

    _onOwnerNameChanged (e) {
        const { email } = this.state.owner;

        this.setState({
            owner: {
                name: e.target.value,
                email
            }
        });
    }

    _onOwnerEmailChanged (e) {
        const { name } = this.state.owner;

        this.setState({
            owner: {
                email: e.target.value,
                name
            }
        });
    }

    _onSubtitleChanged (e) {
        this.setState({
            subtitle: e.target.value
        });
    }

    _onTitleChanged (e) {
        this.setState({
            title: e.target.value
        });
    }

    _onVendorChanged (e) {
        this.setState({
            vendor: e.target.value
        });
    }


    // Eposode change handlers

    _deleteEpisode (id) {
        const { episodes } = this.state;

        this.setState({
            episodes: episodes.filter((cur) => id !== cur.episode.id)
            // episodes: episodes.filter((e) => id !== e.id)
        });
    }

    _editEpisode (id) {
        const { episodes } = this.state;
        const updEpisodes = episodes.map((curE) => curE.episode.id !== id ? curE : {
            episode: curE.episode,
            mode:    'edit'
        });

        this.setState({
            episodes: updEpisodes
        });
    }

    _saveEpisode (oldId, episode) {
        const { episodes } = this.state;

        console.log('saveEpisode', episodes);
        const updEpisodes = episodes.map((curE) => curE.episode.id !== oldId ? curE : {
            episode,
            mode: 'normal'
        });

        this.setState({
            episodes: updEpisodes
        });
    }

    _restoreSavedPodcastChanges () {
        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            id,
            image,
            language,
            owner,
            subtitle,
            title,
            vendor
        } = this.state.lastSavedPodcast;

        this.setState({
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            id,
            image,
            language,
            owner,
            subtitle,
            title,
            vendor
        });
    }

    _getNewPodcastValues () {
        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            id,
            image,
            language,
            owner,
            subtitle,
            title,
            vendor
        } = this.state;

        return {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            id,
            image,
            language,
            owner,
            subtitle,
            title,
            vendor
        };
    }

    render () {
        const {
            author,
            category,
            complete,
            description,
            episodes,
            explicit,
            id,
            image,
            language,
            mode,
            owner,
            subtitle,
            title,
            vendor
        } = this.state;

        // Buttons

        const btnAddEpisode = complete ? null : (
            <input
                className = { Styles.btnAddEpisode }
                key = 'addEpisode'
                type = 'button'
                value = 'Add episode'
                onClick = { () => this.onAddEpisode }
            />
        );

        const btnEdit = mode === 'normal' ? (
            <input
                className = { Styles.btnEditPodcast }
                type = 'button'
                value = 'Edit'
                onClick = { this.onEditPodcastClicked }
            />
        ) : null;

        const btnCancel = mode === 'edit' ? (
            <input
                className = { Styles.btnCancel }
                type = 'button'
                value = 'Cancel'
                onClick = { this.onCancelClicked }
            />
        ) : null;

        const btnSave = mode === 'edit' ? (
            <input
                className = { Styles.btnSave }
                type = 'button'
                value = 'Save'
                onClick = { this.onSavePodcastClicked }
            />
        ) : null;

        const episodesListElement = episodes.map((curE) => (
            <li key = { curE.episode.id }>
                <Episode
                    author = { curE.episode.author }
                    date = { curE.episode.date }
                    deleteMyself = { this.deleteEpisode }
                    description = { curE.episode.description }
                    editMyself = { this.editEpisode }
                    explicit = { curE.episode.explicit }
                    id = { curE.episode.id }
                    mode = { curE.mode }
                    parentMode = { mode }
                    saveMyself = { this.saveEpisode }
                    title = { curE.episode.title }
                />
            </li>
        ));

        return (
            <section className = { Styles.podcastComponent }>
                { btnCancel }
                { btnEdit }
                { btnSave }
                <div className = { Styles.header } >
                    <Fields.Title
                        changeValue = { this.onTitleChanged }
                        mode = { mode }
                        title = { title }
                    />
                    <Fields.Subtitle
                        changeValue = { this.onSubtitleChanged }
                        mode = { mode }
                        subtitle = { subtitle }
                    />
                    <Fields.Author
                        author = { author }
                        changeValue = { this.onAuthorChanged }
                        mode = { mode }
                    />
                </div>
                <div className = { Styles.padder } >
                    <div className = { Styles.leftStack }>
                        <Fields.Image
                            changeValue = { this.onImageChanged }
                            image = { image }
                            mode = { mode }
                        />
                        <div>
                            <Fields.Id
                                changeValue = { this.onIdChanged }
                                id = { id }
                                mode = { mode }
                            />
                            <Fields.Vendor
                                changeValue = { this.onVendorChanged }
                                mode = { mode }
                                vendor = { vendor }
                            />
                            <Fields.Category
                                category = { category }
                                changeValue = { this.onCategoryChanged }
                                mode = { mode }
                                options = { categories }
                            />
                            <Fields.Language
                                changeValue = { this.onLanguageChanged }
                                language = { language }
                                mode = { mode }
                                options = { languages }
                            />
                            <Fields.Explicit
                                changeValue = { this.onExplicitChanged }
                                explicit = { explicit }
                                mode = { mode }
                            />
                            <Fields.Complete
                                changeValue = { this.onCompleteChanged }
                                complete = { complete }
                                mode = { mode }
                            />
                        </div>
                        <Fields.Owner
                            changeEmail = { this.onOwnerEmailChanged }
                            changeName = { this.onOwnerNameChanged }
                            mode = { mode }
                            owner = { owner }
                        />
                    </div>
                    <div className = { Styles.centerStack } >
                        <Fields.Description
                            changeValue = { this.onDescriptionChanged }
                            description = { description }
                            mode = { mode }
                        />
                        <div
                            className = {
                                `${Styles.episodesTable}
                                ${mode === 'edit' ? Styles.editMode : ''}`
                            }>
                            <div className = { Styles.headers } >
                                <span className = { Styles.id } >Id</span>
                                <span className = { Styles.title } >Title</span>
                                <span className = { Styles.description } >Description</span>
                                <span className = { Styles.author } >Author</span>
                                <span className = { Styles.released } >Released</span>
                                <span className = { Styles.explicit } >Explicit</span>
                            </div>
                            <ul className = { Styles.episodesList } >
                                { episodesListElement }
                            </ul>
                            { btnAddEpisode }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
