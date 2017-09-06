import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { languages, categories } from '../Mock';

import Styles from './styles.scss';

export default class Podcast extends Component {
    static propTypes = {
        mode:          PropTypes.string.isRequired,
        onOpenEpisode: PropTypes.func.isRequired,
        podcast:       PropTypes.objectOf((propValue, key, componentName) => {
            const receivedType = typeof propValue[key];
            let expectedType = '';
            const errMessage = (expType) => `Invalid prop 'podcast.${key}' of type '${receivedType}' supplied to '${componentName}', expected '${expType}'.`;

            switch (key) {
                // expected 'string'
                case 'id':
                case 'vendor':
                case 'title':
                case 'subtitle':
                case 'description':
                case 'language':
                case 'author':
                case 'image':
                    expectedType = 'string';

                    if (receivedType !== expectedType) {
                        return new Error(errMessage(expectedType));
                    }

                    break;

                // expected 'boolean'
                case 'explicit':
                case 'complete':
                    expectedType = 'boolean';

                    if (receivedType !== expectedType) {
                        return new Error(errMessage(expectedType));
                    }

                    break;

                // expected 'object'
                case 'owner':
                case 'category':
                    expectedType = 'object';

                    if (receivedType !== expectedType) {
                        return new Error(errMessage(expectedType));
                    }

                    break;

                // expected 'array'
                case 'episodes':
                    expectedType = 'array';
                    if (receivedType !== expectedType) {
                        return new Error(errMessage(expectedType));
                    }

                    break;

                default:
                    break;
            }
        })
    };

    constructor () {
        super();

        // on element click handlers
        this.handleDeleteEpisodeClicked = ::this._handleDeleteEpisodeClicked;
        this.handleEditPodcastClicked = ::this._handleEditPodcastClicked;
        this.handleSavePodcastClicked = ::this._handleSavePodcastClicked;
        this.handleCancelClicked = ::this._handleCancelClicked;
        this.handleImageClicked = ::this._handleImageClicked;

        // on element change handlers
        this.handleAuthorChanged = ::this._handleAuthorChanged;
        this.handleCategoryChanged = ::this._handleCategoryChanged;
        this.handleCompleteChanged = ::this._handleCompleteChanged;
        this.handleDescriptionChanged = ::this._handleDescriptionChanged;
        this.handleExplicitChanged = ::this._handleExplicitChanged;
        this.handleIdChanged = ::this._handleIdChanged;
        this.handleImageChanged = ::this._handleImageChanged;
        this.handleLanguageChanged = ::this._handleLanguageChanged;
        this.handleOwnerNameChanged = ::this._handleOwnerNameChanged;
        this.handleOwnerEmailChanged = ::this._handleOwnerEmailChanged;
        this.handleSubtitleChanged = ::this._handleSubtitleChanged;
        this.handleTitleChanged = ::this._handleTitleChanged;
        this.handleVendorChanged = ::this._handleVendorChanged;

        this.restoreSavedPodcastChanges = ::this._restoreSavedPodcastChanges;
        this.getNewPodcastValues = ::this._getNewPodcastValues;
    }

    state = {
        authorE:      '',
        categoryE:    {},
        completeE:    false,
        descriptionE: '',
        episodesE:    [],
        explicitE:    false,
        idE:          '',
        imageE:       '',
        languageE:    '',
        mode:         '',
        ownerE:       {},
        subtitleE:    '',
        titleE:       '',
        vendorE:      ''
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
            authorE:          author,
            categoryE:        category,
            completeE:        complete,
            descriptionE:     description,
            episodesE:        episodes,
            explicitE:        explicit,
            idE:              id,
            imageE:           image,
            languageE:        language,
            lastSavedPodcast: this.props.podcast,
            mode,
            ownerE:           owner,
            subtitleE:        subtitle,
            titleE:           title,
            vendorE:          vendor
        });
    }

    // on element click handlers

    _handleCancelClicked (e) {
        this.restoreSavedPodcastChanges();
        this.setState({ mode: 'open' });
    }

    _handleDeleteEpisodeClicked (delEp) {
        const episodes = this.state.episodesE;

        this.setState({
            episodesE: episodes.filter((ep) => ep === delEp)
        });
    }

    _handleEditPodcastClicked () {
        this.getNewPodcastValues();
        this.setState({ mode: 'edit' });
    }

    _handleImageClicked () {
        this.chooseImage.click();
    }

    _handleSavePodcastClicked () {
        const changedPodcast = this.getNewPodcastValues();

        this.setState({
            mode:             'open',
            lastSavedPodcast: changedPodcast
        });
    }

    // on element change handlers

    _handleAuthorChanged (e) {
        this.setState({
            authorE: e.target.value
        });
    }

    _handleCategoryChanged (e) {
        this.setState({
            categoryNameE: e.target.value
        });
    }

    _handleCompleteChanged (e) {
        this.setState({
            completeE: e.target.value
        });
    }

    _handleDescriptionChanged (e) {
        this.setState({
            descriptionE: e.target.value
        });
    }

    _handleExplicitChanged (e) {
        this.setState({
            explicitE: e.target.value
        });
    }

    _handleIdChanged (e) {
        this.setState({
            idE: e.target.value
        });
    }

    _handleImageChanged (e) {
        console.log(e.target.files);
        this.setState({
            // imageE: e.target.files[0]
        });
    }

    _handleLanguageChanged (e) {
        console.log('_handleLanguageChanged');
        this.setState({
            languageE: e.target.value
        });
    }

    _handleOwnerNameChanged (e) {
        const { owner } = this.state;

        this.setState({
            ownerE: {
                name:  e.target.value,
                group: owner.group
            }
        });
    }

    _handleOwnerEmailChanged (e) {
        this.setState({
            ownerEmailE: e.target.value
        });
    }

    _handleSubtitleChanged (e) {
        this.setState({
            subtitleE: e.target.value
        });
    }

    _handleTitleChanged (e) {
        this.setState({
            titleE: e.target.value
        });
    }

    _handleVendorChanged (e) {
        this.setState({
            vendorE: e.target.value
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
            authorE:      author,
            categoryE:    category,
            completeE:    complete,
            descriptionE: description,
            episodesE:    episodes,
            explicitE:    explicit,
            idE:          id,
            imageE:       image,
            languageE:    language,
            ownerE:       owner,
            subtitleE:    subtitle,
            titleE:       title,
            vendorE:      vendor
        });
    }

    _getNewPodcastValues () {
        const {
            authorE:      author,
            categoryE:    category,
            completeE:    complete,
            descriptionE: description,
            episodesE:    episodes,
            explicitE:    explicit,
            idE:          id,
            imageE:       image,
            languageE:    language,
            ownerE:       owner,
            subtitleE:    subtitle,
            titleE:       title,
            vendorE:      vendor
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
        const { onOpenEpisode } = this.props;
        const {
            authorE,
            categoryE,
            completeE,
            descriptionE,
            episodesE,
            explicitE,
            idE,
            imageE,
            languageE,
            mode,
            ownerE,
            subtitleE,
            titleE,
            vendorE
        } = this.state;

        const episodes = mode === 'create' ? null : episodesE.map((e) => (
            <li key = { e.id } >
                { mode === 'open' ? (
                    <input
                        className = { Styles.edit }
                        type = 'button'
                        onClick = { () => onOpenEpisode('edit', e) }
                    />
                ) : (
                    <input
                        disabled
                        className = { Styles.edit }
                        type = 'button'
                        onClick = { () => onOpenEpisode('edit', e) }
                    />
                )}
                <span className = { Styles.id } >{ e.id }</span>
                <span className = { Styles.title } >{ e.title }</span>
                <span className = { Styles.description } >{ e.description }</span>
                <span className = { Styles.author } >{ e.author }</span>
                <span className = { Styles.released } >{ moment(e.date).format('l') }</span>
                <span className = { Styles.explicit } >{ e.explicit ? 'yes' : 'no' }</span>
                { mode === 'open' ? (
                    <input
                        className = { Styles.delete }
                        type = 'button'
                        onClick = { () => this.handleDeleteEpisodeClicked(e) }
                    />
                ) : (
                    <input
                        disabled
                        className = { Styles.delete }
                        type = 'button'
                        onClick = { () => this.handleDeleteEpisodeClicked(e) }
                    />
                )}
            </li>
        ));

        const addEpisode = completeE ? null : (
            <input
                className = { Styles.add }
                type = 'button'
                value = 'Add episode'
                onClick = { () => onOpenEpisode('create', {}) }
            />
        );

        const ctgOptions = categories.reduce((pre, cur) => {
            const curList = cur.list.map((ctg) => (
                <option
                    key = { ctg }
                    label = { ctg }
                    value = { ctg }
                    onChange = { this.handleCategoryChanged }
                />
            ));

            pre.push(
                <optgroup
                    label = { cur.group }
                    title = { cur.group }>

                    { curList }
                </optgroup>
            );

            return pre;
        }, [<option key = '0' />]);

        const langOptions = languages.reduce((newArr, lang) => {
            newArr.push(
                <option
                    key = { lang.id }
                    value = { lang.id }
                    onChange = { this.handleLanguageChanged }>

                    { lang.name }
                </option>
            );

            return newArr;
        }, [<option key = '0' />]);

        const podcastComponent = mode === 'open' ? (
            <section className = { Styles.podcastComponent }>
                <input
                    className = { Styles.editBtn }
                    type = 'button'
                    value = 'Edit'
                    onClick = { this.handleEditPodcastClicked }
                />
                <div className = { Styles.header } >
                    <h1 className = { Styles.title }>{ titleE }</h1>
                    <h2 className = { Styles.author }>{ authorE }</h2>
                </div>
                <div className = { Styles.padder } >
                    <div className = { Styles.leftStack }>
                        <img src = { imageE } />
                        <ul>
                            <li className = { Styles.category } >
                                Category: { categoryE.name }
                            </li>
                            <li className = { Styles.language } >
                                Language: { languageE }
                            </li>
                        </ul>
                        <div className = { Styles.owner }>
                            <h5>Added by</h5>
                            <div>{ ownerE.name }</div>
                            <div>{ ownerE.email }</div>
                        </div>
                    </div>
                    <div className = { Styles.centerStack } >
                        <h4>Description</h4>
                        <p>{ descriptionE }</p>
                        <div className = { Styles.episodesTable } >
                            <div className = { Styles.headers } >
                                <span className = { Styles.id } >Id</span>
                                <span className = { Styles.title } >Title</span>
                                <span className = { Styles.description } >Description</span>
                                <span className = { Styles.author } >Author</span>
                                <span className = { Styles.released } >Released</span>
                                <span className = { Styles.explicit } >Explicit</span>
                            </div>
                            <ul className = { Styles.table } >
                                { episodes }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        ) : (
            <section className = { Styles.podcastComponent }>
                <input
                    className = { Styles.cancelBtn }
                    type = 'button'
                    value = 'Cancel'
                    onClick = { this.handleCancelClicked }
                />
                <input
                    className = { Styles.saveBtn }
                    type = 'button'
                    value = 'Save'
                    onClick = { this.handleSavePodcastClicked }
                />
                <div className = { Styles.header } >
                    <h1 className = { `${Styles.title} ${Styles.editMode}` }>
                        <input
                            // required
                            type = 'text'
                            value = { titleE }
                            onChange = { this.handleTitleChanged }
                        />
                    </h1>
                    <h2 className = { `${Styles.author} ${Styles.editMode}` }>
                        <input
                            required
                            type = 'text'
                            value = { authorE }
                            onChange = { this.handleAuthorChanged }
                        />
                    </h2>
                </div>
                <div className = { Styles.padder } >
                    <div className = { Styles.leftStack }>
                        <img
                            className = { Styles.editMode }
                            src = { imageE }
                            onClick = { this.onImageClicked }
                        />
                        <input
                            name = 'chooseImage'
                            ref = { (chImg) => this.chooseImage = chImg }
                            type = 'file'
                            value = { imageE }
                            onChange = { this.onImageClicked }
                        />
                        <ul>
                            <li className = { `${Styles.category} ${Styles.editMode}` } >
                                { 'Category: ' }
                                <select
                                    required
                                    name = 'ctg'
                                    value = { categoryE.name }
                                    onChange = { this.handleCategoryChanged }>

                                    { ctgOptions }
                                </select>
                            </li>
                            <li className = { Styles.language } >
                                { 'Language: ' }
                                <select
                                    required
                                    name = 'lang'
                                    value = { languageE }
                                    onChange = { this.handleLanguageChanged }>

                                    { langOptions }
                                </select>
                            </li>
                        </ul>
                        <div className = { Styles.owner }>
                            <h5>Added by</h5>
                            <div className = { Styles.editMode }>
                                <input
                                    required
                                    type = 'text'
                                    value = { ownerE.name }
                                    onChange = { this.handleOwnerNameChanged }
                                />
                            </div>
                            <div className = { Styles.editMode }>
                                <input
                                    required
                                    type = 'email'
                                    value = { ownerE.email }
                                    onChange = { this.handleOwnerEmailChanged }
                                />
                            </div>
                        </div>
                    </div>
                    <div className = { Styles.centerStack } >
                        <h4>Description</h4>
                        <p className = { Styles.editMode }>
                            <textarea
                                // required
                                type = 'text'
                                value = { descriptionE }
                                onChange = { this.handleDescriptionChanged }
                            />
                        </p>
                        <div className = { Styles.episodesTable } >
                            <div className = { Styles.headers } >
                                <span className = { Styles.id } >Id</span>
                                <span className = { Styles.title } >Title</span>
                                <span className = { Styles.description } >Description</span>
                                <span className = { Styles.author } >Author</span>
                                <span className = { Styles.released } >Released</span>
                                <span className = { Styles.explicit } >Explicit</span>
                            </div>
                            <ul className = { Styles.table } >
                                { episodes }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );

        return podcastComponent;
    }
}
