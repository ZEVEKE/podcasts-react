import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { getCurrentTime } from '../../helpers';

import Styles from './styles.scss';

export default class Episode extends Component {
    static propTypes = {
        createEpisode:     PropTypes.func,
        date:              PropTypes.string,
        description:       PropTypes.string,
        exitWithoutSaving: PropTypes.func,
        explicit:          PropTypes.string,
        id:                PropTypes.string,
        mode:              PropTypes.string,
        title:             PropTypes.string
    };

    constructor () {
        super();
        this.handleIdInputChange = ::this._handleIdInputChange;
        this.handleTitleInputChange = ::this._handleTitleInputChange;
        this.handleDescriptionInputChange = ::this._handleDescriptionInputChange;
        this.handleExplicitInputClicked = ::this._handleExplicitInputClicked;
        this.handleSave = ::this._handleSave;
        this.handleCancel = ::this._handleCancel;
    }

    state = {
        id:          '',
        title:       '',
        date:        '',
        description: '',
        explicit:    false
    };

    componentWillMount () {
        const { id, title, description, explicit, date, mode } = this.props;

        if (mode === 'create') {
            this.updateDate = setInterval(() => this.setState({ date: getCurrentTime() }), 1000);
        }

        this.setState({
            id,
            title,
            description,
            explicit,
            date: moment(date).format('l')
        });
    }

    componentWillUnmount () {
        if (this.state.mode === 'create') {
            clearInterval(this.updateDate);
        }
    }

    _handleIdInputChange (event) {
        this.setState({
            id: event.target.value
        });
    }

    _handleTitleInputChange (event) {
        this.setState({
            title: event.target.value
        });
    }

    _handleDescriptionInputChange (event) {
        this.setState({
            description: event.target.value
        });
    }

    _handleExplicitInputClicked (event) {
        this.setState({
            explicit: event.target.checked
        });
    }

    _handleCancel () {
        this.props.exitWithoutSaving();
    }

    async _handleSave (event) {
        event.preventDefault();

        // const { id, title, description, explicit } = this.state;
        // const { createEpisode } = this.props;
        //
        // if (!title) {
        //     throw new Error(`title should be not empty`);
        // }
        //
        // if (!description) {
        //     throw new Error(`description should be not empty`);
        // }
        //
        // await createEpisode({
        //     id,
        //     date: getCurrentTime(),
        //     description,
        //     explicit,
        //     title
        // });
        //
        // this.setState({
        //     explicit:    '',
        //     description: '',
        //     title:       ''
        // });
    }

    render () {
        // const { id, title, description, explicit, date, mode } = this.state;
        //
        // const form = '';//(
        // {/*<form*/}
        //     {/*onReset = { this.handleCancel }*/}
        //     {/*onSubmit = { this.handleSave }>*/}
        //
        //     {/*<div className = { Styles.id }>*/}
        //         {/*<span>Title</span>*/}
        //         {/*<input*/}
        //             {/*placeholder = 'Id'*/}
        //             {/*type = 'text'*/}
        //             {/*value = { id }*/}
        //             {/*onChange = { this.handleIdInputChange }*/}
        //         {/*/>*/}
        //     {/*</div>*/}
        //
        //     {/*<div className = { Styles.title }>*/}
        //         {/*<span>Title</span>*/}
        //         {/*<input*/}
        //             {/*placeholder = 'Title'*/}
        //             {/*type = 'text'*/}
        //             {/*value = { title }*/}
        //             {/*onChange = { this.handleTitleInputChange }*/}
        //         {/*/>*/}
        //     {/*</div>*/}
        //
        //     {/*<div className = { Styles.description }>*/}
        //         {/*<span>Desription</span>*/}
        //         {/*<textarea*/}
        //             {/*placeholder = 'Desription'*/}
        //             {/*type = 'text'*/}
        //             {/*value = { description }*/}
        //             {/*onChange = { this.handleDescriptionInputChange }*/}
        //         {/*/>*/}
        //     {/*</div>*/}
        //
        //     {/*<div className = { Styles.date }>*/}
        //         {/*<span>Released</span>*/}
        //         {/*<div>{ date }</div>*/}
        //     {/*</div>*/}
        //
        //     {/*<div className = { Styles.explicit }>*/}
        //         {/*<span>Explicit</span>*/}
        //         {/*<checkbox*/}
        //             {/*checked = { explicit }*/}
        //             {/*type = 'switch'*/}
        //             {/*onClick = { this.handleExplicitInputClicked }*/}
        //         {/*/>*/}
        //     {/*</div>*/}
        //
        //     {/*<div className = { Styles.btnContainer }>*/}
        //         {/*<input*/}
        //             {/*className = { Styles.cancel }*/}
        //             {/*type = 'reset'*/}
        //         {/*/>*/}
        //         {/*<input*/}
        //             {/*className = { Styles.universal }*/}
        //             {/*type = 'submit'*/}
        //         {/*/>*/}
        //     {/*</div>*/}
        // {/*</form>*/}
        // );

        return <section>form</section>;
    }
}
