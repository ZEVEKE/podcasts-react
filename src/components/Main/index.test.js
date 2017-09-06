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

    test(`<Main /> should contain three child elements initially`, () => {

        expect(result.find(`section`).children().length).toBe(3);

        expect(result.find(`h1`).length).toBe(1);
        expect(result.find(`PodcastsList`).length).toBe(1);
        expect(result.find(`input`).length).toBe(1);
    });

    test(`<Main /> componentWillMount should be called once`, () => {
        spy(Main.prototype, `componentWillMount`);

        mount(
            <Main />
        );
        expect(Main.prototype.componentWillMount.calledOnce).toBe(true);
    });

    test(`fetchPodcasts should be a function`, () => {
        expect(typeof new Main().fetchPodcasts).toBe(`function`);
    });

    test(`createPodcast should be a function`, () => {
        expect(typeof new Main().createPodcast).toBe(`function`);
    });

    test(`openPodcast should be a function`, () => {
        expect(typeof new Main().openPodcast).toBe(`function`);
    });

    test(`openPodcast should throw error if passed argument is not object`, () => {
        function openPodcastWithError () {
            main.openPodcast();
        }

        expect(openPodcastWithError).toThrowError(
            `passed argument should be an object`
        );
    });

    test(`<Main /> should contain only Podcast component, if openPodcast calling`, () => {
        main.openPodcast(podcasts[0]);

        expect(result.find(`section`).children().length).toBe(1);
        expect(result.state().page).toBe('podcast');
        expect(result.find(`Podcast`).length).toBe(1);
    });

    test(`editEpisode should be a function`, () => {
        expect(typeof main.editEpisode).toBe(`function`);
    });

    test(`editEpisode should throw error if passed argument is not object`, () => {
        function editEpisodeWithError () {
            main.editEpisode();
        }

        expect(editEpisodeWithError).toThrowError(
            `passed argument should be an object`
        );
    });

    test(`<Main /> should contain only Episode component after openPodcast calling`, () => {
        main.openEpisode(podcasts[0].episodes[0]);

        expect(result.find(`section`).children().length).toBe(1);
        expect(result.find(`Episode`).length).toBe(1);
    });
});
