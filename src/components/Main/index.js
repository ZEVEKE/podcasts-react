import React, { Component } from 'react';

import Styles from './styles.scss';
import { data, emptyEpisode, emptyPodcast } from '../Mock/index';

import PodcastsList from '../PodcastsList';
import Podcast from '../Podcast';
import Episode from '../Episode';

export default class Main extends Component {
    constructor () {
        super();

        this.fetchPodcasts = ::this._fetchPodcasts;

        this.onSavePodcast = ::this._onSavePodcast;
        this.onOpenPodcast = ::this._onOpenPodcast;
        this.onOpenEpisode = ::this._onOpenEpisode;
    }

    state = {
        posts:   [],
        page:    `main`,
        current: {
            mode: ''
        }
    };

    componentWillMount () {
        this.fetchPodcasts();
    }

    _onOpenPodcast (mode, podcast = emptyPodcast) {
        this.setState({
            page:    'podcast',
            current: {
                mode,
                podcast
            }
        });
    }

    _onSavePodcast (podcast) {
        // TODO
    }

    _onOpenEpisode (mode, episode = emptyEpisode) {
        this.setState({
            page:    'episode',
            current: {
                mode,
                episode
            }
        });
    }

    _fetchPodcasts () {
        this.setState({ podcasts: data });
    }

    render () {
        const {
            podcasts: podcastsList,
            page,
            current
        } = this.state;
        let content = '';

        switch (page) {
            case 'main':
                content = (
                    <section className = { Styles.mainComponent } >
                        <PodcastsList
                            podcasts = { podcastsList }
                            onOpenPodcast = { this.onOpenPodcast }
                        />
                    </section>
                );
                break;

            case 'podcast':
                content = (
                    <section className = { Styles.mainComponent } >
                        <Podcast
                            mode = { current.mode }
                            podcast = { current.podcast }
                            onOpenEpisode = { this.onOpenEpisode }
                            onOpenPodcast = { this.onOpenPodcast }
                            onSavePodcast = { this.onSavePodcast }
                        />
                    </section>
                );
                break;

            case 'episode':
                content = (
                    <section className = { Styles.mainComponent } >
                        <Episode
                            episode = { current.episode }
                            mode = { current.mode }
                        />
                    </section>
                );
                break;

            default:
                break;
        }

        return content;
    }
}
