// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';

import Main from '../../components/Main';

export default class App extends Component {
    render () {

        return (
            <section className = { Styles.appContainer }>
                <Main />
            </section>
        );
    }
}
