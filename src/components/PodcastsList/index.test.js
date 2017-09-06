import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { data } from '../Mock';
import PodcastsList from './';

const result = shallow(
    <PodcastsList podcasts = { data } />
);

describe(`PodcastsList`, () => {
    test(`findPodcastById should be a function`, () => {
        expect(typeof new PodcastsList().findPodcastById).toBe('function');
    });

    test(`openPodcast should be a function`, () => {
        expect(typeof new PodcastsList().openPodcast).toBe('function');
    });

    test(`Quantity of 'li' should be same as props.podcasts.length`, () => {
        expect(result.find(`li`).length).toBe(result.props().podcasts.length);
    });

    test(`component should be unmounted if one of podcasts is clicked`, () => {
        result.find(`li`).nodes.childAt(0).simulate('onClick');
        console.log('hello');

        expect(result).toBe(1);
    });
});
