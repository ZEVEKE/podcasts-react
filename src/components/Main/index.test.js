import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import Main from './';

const result = shallow(
    <Main />
);
const main = new Main();

describe(`Main`, () => {
    test(`state.page should be equal to 'list'`, () => {
        expect(result.state().page).toBe('list');
    });

    test(`<Main /> should contain one child elements initially`, () => {

        expect(result.find(`section`).children().length).toBe(1);
        expect(result.find(`PodcastsList`).length).toBe(1);
    });

    test(`Should respond to state change properly`, () => {
        result.setState({
            page: 'podcast'
        });

        expect(result.find('Podcast').length).toBe(1);
    });

    test(`<Main /> componentWillMount should be called once`, () => {
        spy(Main.prototype, `componentWillMount`);

        mount(
            <Main />
        );
        expect(Main.prototype.componentWillMount.calledOnce).toBe(true);
    });

    test(`fetchPodcasts should be a function`, () => {
        expect(typeof main.fetchPodcasts).toBe(`function`);
    });

    test(`onReturnToMenu should be a function`, () => {
        expect(typeof main.onReturnToMenu).toBe(`function`);
    });

    test(`onOpenPodcast should be a function`, () => {
        expect(typeof main.onOpenPodcast).toBe(`function`);
    });

    test(`onEditPodcast should be a function`, () => {
        expect(typeof main.onEditPodcast).toBe(`function`);
    });

    test(`onSavePodcast should be a function`, () => {
        expect(typeof main.onSavePodcast).toBe(`function`);
    });
});
