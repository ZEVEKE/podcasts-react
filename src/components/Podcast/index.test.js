import React from 'react';
import { shallow } from 'enzyme';

import { data } from '../Mock/';

import Podcast from './';

const podcast = data[0];
const result = shallow(
    <Podcast
        mode = 'open'
        { ...podcast }
    />
);

describe(`Podcast in open mode`, () => {
    test(`Should have 1 'h1' element`, () => {
        expect(result.find(`h1`).length).toBe(1);
    });

    test(`Should respond to state change properly`, () => {
        result.setState({
            page: 'podcast'
        });

        expect(result.find('Podcast').length).toBe(1);

        result.setState({
            page: 'episode'
        });

        expect(result.find('Episode').length).toBe(1);

        result.setState({
            page: 'main'
        });

        expect(result.find('Main').length).toBe(1);

        result.setState({
            page: ''
        });

        expect(result.find('Main').length).toBe(1);
    });
});
