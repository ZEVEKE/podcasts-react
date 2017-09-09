import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

export default class PodcastsList extends Component {
    static contextTypes = {
        emptyPodcast: PropTypes.object.isRequired
    };

    static propTypes = {
        podcasts:      PropTypes.array.isRequired,
        onOpenPodcast: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.findPodcastById = ::this._findPodcastById;
    }

    _findPodcastById (id) {
        const { podcasts } = this.props;

        for (const p of podcasts) {
            if (p.id === id) {
                return p;
            }
        }
    }

    render () {
        const { emptyPodcast } = this.context;
        const { podcasts, onOpenPodcast } = this.props;
        const podcastsList = podcasts.map((p) => (
            <li key = { p.id }>
                <a onClick = { () => onOpenPodcast(p, 'normal', false) }>
                    <img src = { p.image } />
                </a>
                <a onClick = { () => onOpenPodcast(p, 'normal', false) }>
                    <h2>
                        { p.title }
                    </h2>
                    <span>
                        { p.author }
                    </span>
                </a>
            </li>
        ));

        return (
            <section className = { Styles.podcastsListComponent }>
                <h1>Podcasts</h1>
                <ul>
                    { podcastsList }
                </ul>
                <input
                    className = { Styles.addPodcast }
                    type = 'button'
                    value = 'New'
                    onClick = { () => onOpenPodcast(emptyPodcast, 'edit', true) }
                />
            </section>
        );
    }
}
