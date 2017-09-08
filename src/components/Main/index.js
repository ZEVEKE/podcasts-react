import React, { Component } from 'react';

import { Transition } from 'react-transition-group';
import TweenMax from 'gsap';

import Styles from './styles.scss';
import { data } from '../Mock/index';

import PodcastsList from '../PodcastsList';
import Podcast from '../Podcast';

export default class Main extends Component {
    constructor () {
        super();

        this.fetchPodcasts = ::this._fetchPodcasts;

        // this.onSavePodcast = ::this._onSavePodcast;
        this.onOpenPodcast = ::this._onOpenPodcast;
        this.handlePodcastsListAppear = ::this._handlePodcastsListAppear;
        this.handlePodcastsListDisappear = ::this._handlePodcastsListDisappear;
        this.handlePodcastAppear = ::this._handlePodcastAppear;
        this.handlePodcastDisappear = ::this._handlePodcastDisappear;
        this.handleEpisodeAppear = ::this._handleEpisodeAppear;
        this.handleEpisodeDisappear = ::this._handleEpisodeDisappear;
    }

    state = {
        current: {
            mode: 'normal'
        },
        page:     `main`,
        podcasts: []
    };

    componentWillMount () {
        this.fetchPodcasts();
    }

    _onOpenPodcast (podcast, mode, isNew) {
        this.setState({
            current: {
                isNew,
                mode,
                podcast
            },
            page: 'podcast'
        });
    }

    // _onSavePodcast (podcast) {
    //     TODO
    // }

    _fetchPodcasts () {
        this.setState({ podcasts: data });
    }

    // Transitions

    _handlePodcastsListAppear () {
        const { podcastsList } = this;
        // console.log('_handlePodcastsListAppear');

        TweenMax.fromTo(podcastsList, 0.6, { y: -800 }, { y: 0 });
    }

    _handlePodcastsListDisappear () {
        const { podcastsList } = this;
        // console.log('_handlePodcastsListDisappear');

        TweenMax.fromTo(podcastsList, 0.6, { y: 0 }, { y: 800 });
    }

    _handlePodcastAppear () {
        const { podcast } = this;
        // console.log('_handlePodcastAppear');

        TweenMax.fromTo(podcast, 0.6, { y: -800 }, { y: 0 });
    }

    _handlePodcastDisappear () {
        const { podcast } = this;
        // console.log('_handlePodcastDisappear');

        TweenMax.fromTo(podcast, 0.6, { x: 0 }, { x: -1000 });
    }

    _handleEpisodeAppear () {
        const { episode } = this;

        TweenMax.fromTo(episode, 0.6, { y: -800 }, { y: 0 });
    }

    _handleEpisodeDisappear () {
        const { episode } = this;

        TweenMax.fromTo(episode, 0.6, { x: 0 }, { x: 1000 });
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
                        isNew = { false }
                        mode = { current.mode }
                        podcast = { current.podcast }
                        onSavePodcast = { this.onSavePodcast }
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
