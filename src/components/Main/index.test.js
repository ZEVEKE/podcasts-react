import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import { data as podcasts } from '../Mock';
import Main from './';

const result = shallow(
    <Main />
);
const main = new Main();

describe(`Main`, () => {
    test(`state.page should be equal to 'main'`, () => {
        expect(result.state().page).toBe('main');
    });

    test(`<Main /> should contain one child elements initially`, () => {

        expect(result.find(`section`).children().length).toBe(1);
        expect(result.find(`PodcastsList`).length).toBe(1);
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

    test(`onPushPodcast should be a function`, () => {
        expect(typeof main.onPushPodcast).toBe(`function`);
    });

    test(`onOpenPodcast should be a function`, () => {
        expect(typeof main.onOpenPodcast).toBe(`function`);
    });

    test(`handlePodcastsListAppear should be a function`, () => {
        expect(typeof main.handlePodcastsListAppear).toBe(`function`);
    });

    test(`handlePodcastsListDisappear should be a function`, () => {
        expect(typeof main.handlePodcastsListDisappear).toBe(`function`);
    });

    test(`handlePodcastAppear should be a function`, () => {
        expect(typeof main.handlePodcastAppear).toBe(`function`);
    });

    test(`handlePodcastDisappear should be a function`, () => {
        expect(typeof main.handlePodcastDisappear).toBe(`function`);
    });

    test(`onOpenPodcast should throw error if passed argument is not object`, () => {
        function openPodcastWithError () {
            main.onOpenPodcast();
        }

        expect(openPodcastWithError).toThrowError(
            `passed arguments should be an object, a string & a boolean value`
        );
    });

    test(`<Main /> should contain only 1 'div' element, if onOpenPodcast calling`, () => {
        main.onOpenPodcast(podcasts[0], 'normal', false);

        expect(result.find(`section`).children().length).toBe(1);
        expect(result.state().page).toBe('main');
        expect(result.find(`div`).length).toBe(1);
    });
});
