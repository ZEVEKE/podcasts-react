import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Styles from './styles.scss';
import config from '../../adds';

import PodcastsList from '../PodcastsList';
import Podcast from '../Podcast';

export default class Main extends Component {
    static childContextTypes = {
        categories: PropTypes.array.isRequired,
        languages:  PropTypes.array.isRequired
    };

    constructor () {
        super();

        this.fetchPodcasts = ::this._fetchPodcasts;

        this.onReturnToMenu = ::this._onReturnToMenu;
        this.onOpenPodcast = ::this._onOpenPodcast;
        this.onCancelPodcast = ::this._onCancelPodcast;
        this.onEditPodcast = ::this._onEditPodcast;
        this.onSavePodcast = ::this._onSavePodcast;
    }

    state = {
        current: {
            isEdited: false,
            isNew:    false,
            podcast:  {}
        },
        page:     'list',
        nextPage: 'list',
        podcasts: []
    };

    getChildContext () {
        return {
            categories: config.categories,
            languages:  config.languages
        };
    }

    async componentWillMount () {
        await this.fetchPodcasts();
    }

    shouldComponentUpdate (undefined, nextState) {
        // Provide normal page changing using animation
        if (nextState.nextPage !== this.state.nextPage) {
            nextState.page = '';
            setTimeout(() => {
                this.setState((prevState) => ({
                    page: prevState.nextPage
                }));
            }, 250);
        }

        return true;
    }

    _onOpenPodcast (podcast, isNew) {
        if (typeof podcast !== 'object' || typeof isNew !== 'boolean') {
            throw new Error(`passed arguments should have following types: (object, boolean)`);
        }

        this.setState({
            current: {
                isEdited: isNew,
                isNew,
                podcast
            },
            nextPage: 'podcast'
        });
    }

    _onCancelPodcast () {
        this.setState((prevState) => {
            const { current: { podcast: { id }}, podcasts } = prevState;

            return {
                current: {
                    isEdited: false,
                    isNew:    false,
                    podcast:  podcasts.find((item) => item.id === id)
                }
            };
        });
    }

    _onEditPodcast () {
        this.setState((prevState) => ({
            current: {
                isEdited: true,
                isNew:    false,
                podcast:  prevState.current.podcast
            }
        }));
    }

    _onSavePodcast (podcast) {
        // TODO post request to server
        this.setState((prevState) => {
            const { current: { isNew, podcast: { id }}, podcasts } = prevState;
            const updatedPodcasts = isNew ?
                [podcast, ...podcasts]
                : podcasts.map((p) => p.id === podcast.id ? { ...podcast, id } : p);

            return {
                podcasts: updatedPodcasts,
                current:  {
                    isEdited: false,
                    isNew:    false,
                    podcast:  { ...podcast }
                }
            };
        });
    }

    _onReturnToMenu () {
        this.setState({
            nextPage: 'list'
        });
    }

    async _fetchPodcasts () {
        const blob = await fetch('https://s3-eu-west-1.amazonaws.com/lectrum/podcasts.json');
        const podcasts = await blob.json();

        this.setState({ podcasts });
    }

    render () {
        const {
            current: {
                isEdited,
                isNew,
                podcast
            },
            page,
            podcasts
        } = this.state;

        const renderList = page === 'list' ? (
            <CSSTransition
                classNames = { {
                    enter:       Styles.listEnter,
                    enterActive: Styles.listEnterActive,
                    exit:        Styles.listExit,
                    exitActive:  Styles.listExitActive
                } }
                key = { 'list' }
                timeout = { 500 }>
                <div>
                    <PodcastsList
                        podcasts = { podcasts }
                        onOpenPodcast = { this.onOpenPodcast }
                    />
                </div>
            </CSSTransition>
        ) : null;

        const renderPodcast = page === 'podcast' ? (
            <CSSTransition
                classNames = { {
                    enter:       Styles.podcastEnter,
                    enterActive: Styles.podcastEnterActive,
                    exit:        Styles.podcastExit,
                    exitActive:  Styles.podcastExitActive
                } }
                key = { 'podcast' }
                timeout = { 500 }>
                <div>
                    <Podcast
                        cancelMyself = { this.onCancelPodcast }
                        editMyself = { this.onEditPodcast }
                        isEdited = { isEdited }
                        isNew = { isNew }
                        podcast = { podcast }
                        returnToMain = { this.onReturnToMenu }
                        saveMyself = { this.onSavePodcast }
                    />
                </div>
            </CSSTransition>
        ) : null;

        return (
            <section className = { Styles.mainComponent }>
                <TransitionGroup>
                    { renderList }
                    { renderPodcast }
                </TransitionGroup>
            </section>
        );
    }
}
