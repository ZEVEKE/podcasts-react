import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getUniqueID } from '../../helpers';

import Styles from './styles.scss';

export default class PodcastsList extends Component {
    static propTypes = {
        podcasts:      PropTypes.array.isRequired,
        onOpenPodcast: PropTypes.func.isRequired
    };

    render () {
        const { podcasts, onOpenPodcast } = this.props;
        const podcastsList = podcasts.map((p) => (
            <li key = { p.id }>
                <a
                    className = { Styles.imgContainer }
                    onClick = { () => onOpenPodcast(p, false) }>
                    <img src = { p.image } />
                </a>
                <a
                    className = { Styles.textContainer }
                    onClick = { () => onOpenPodcast(p, false) }>
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
            <section className = { Styles.listComponent }>
                <h1>Podcasts</h1>
                <ul>
                    { podcastsList }
                </ul>
                <input
                    className = { Styles.btnAdd }
                    type = 'button'
                    value = 'New'
                    onClick = { () => onOpenPodcast({
                        author:      '',
                        category:    {},
                        complete:    false,
                        description: '',
                        episodes:    [],
                        explicit:    false,
                        id:          getUniqueID(15),
                        image:       '',
                        language:    {},
                        owner:       {},
                        subtitle:    '',
                        title:       '',
                        vendor:      ''
                    }, true) }
                />
            </section>
        );
    }
}
