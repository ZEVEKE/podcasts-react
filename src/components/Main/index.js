import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Transition } from 'react-transition-group';
import TweenMax from 'gsap';

import Styles from './styles.scss';
import { categories, emptyEpisode, emptyPodcast, languages, data } from '../Mock';

import PodcastsList from '../PodcastsList';
import Podcast from '../Podcast';

export default class Main extends Component {
    static childContextTypes = {
        categories:   PropTypes.array.isRequired,
        emptyEpisode: PropTypes.object.isRequired,
        emptyPodcast: PropTypes.object.isRequired,
        languages:    PropTypes.array.isRequired
    };

    constructor () {
        super();

        this.fetchPodcasts = ::this._fetchPodcasts;

        this.onPushPodcast = ::this._onPushPodcast;
        this.onOpenPodcast = ::this._onOpenPodcast;
        this.handlePodcastsListAppear = ::this._handlePodcastsListAppear;
        this.handlePodcastsListDisappear = ::this._handlePodcastsListDisappear;
        this.handlePodcastAppear = ::this._handlePodcastAppear;
        this.handlePodcastDisappear = ::this._handlePodcastDisappear;
    }

    state = {
        current: {
            mode: 'normal'
        },
        page:     `main`,
        podcasts: []
    };

    getChildContext () {
        return {
            categories,
            emptyEpisode,
            emptyPodcast,
            languages
        };
    }

    componentWillMount () {
        this.fetchPodcasts();
    }

    _onOpenPodcast (podcast, mode, isNew) {
        if (
            typeof podcast !== 'object'
            || typeof mode !== 'string'
            || typeof isNew !== 'boolean'
        ) {
            throw new Error(`passed arguments should be an object, a string & a boolean value`);
        }

        this.setState({
            current: {
                isNew,
                mode,
                podcast
            },
            page: 'podcast'
        });
    }

    _onPushPodcast (oldId, newPodcast) {
        const { podcasts } = this.state;
        let updated = false;
        const updPodcasts = podcasts.map((podcast) => {
            if (podcast.id === oldId) {
                updated = true;

                return newPodcast;
            }

            return podcast;
        });

        if (!updated) {
            updPodcasts.push(newPodcast);
        }

        this.setState({
            page:     'main',
            podcasts: updPodcasts
        });
    }

    _fetchPodcasts () {
        this.setState({ podcasts: data });
    }

    // Transitions

    _handlePodcastsListAppear () {
        const { podcastsList } = this;

        TweenMax.fromTo(podcastsList, 0.6, { y: -800 }, { y: 0 });
    }

    _handlePodcastsListDisappear () {
        const { podcastsList } = this;

        TweenMax.fromTo(podcastsList, 0.6, { y: 0 }, { y: 800 });
    }

    _handlePodcastAppear () {
        const { podcast } = this;

        TweenMax.fromTo(podcast, 0.6, { y: -800 }, { y: 0 });
    }

    _handlePodcastDisappear () {
        const { podcast } = this;

        TweenMax.fromTo(podcast, 0.6, { x: 0 }, { x: -1000 });
    }

    render () {
        const {
            current,
            page,
            podcasts
        } = this.state;

        const podcastsList = page === 'main' ? (
            <Transition
                appear
                in
                timeout = { 600 }
                onEnter = { this.handlePodcastsListAppear }
                onExit = { this.handlePodcastsListDisappear }>
                <div ref = { (list) => this.podcastsList = list } >
                    <PodcastsList
                        podcasts = { podcasts }
                        onOpenPodcast = { this.onOpenPodcast }
                    />
                </div>
            </Transition>
        ) : null;

        const podcast = page === 'podcast' ? (
            <Transition
                appear
                in
                timeout = { 600 }
                onEnter = { this.handlePodcastAppear }
                onExit = { this.handlePodcastDisappear }>
                <div ref = { (p) => this.podcast = p } >
                    <Podcast
                        isNew = { current.isNew }
                        mode = { current.mode }
                        podcast = { current.podcast }
                        pushMyself = { this.onPushPodcast }
                    />
                </div>
            </Transition>
        ) : null;

        return (
            <section className = { Styles.mainComponent } >
                { podcastsList }
                { podcast }
            </section>
        );
    }
}
