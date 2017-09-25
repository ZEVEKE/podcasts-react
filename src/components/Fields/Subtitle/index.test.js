import React from 'react';
import { shallow } from 'enzyme';

import Title from './';
import Podcast from '../../Podcast';

const subtitle = 'The subtitle';
const result = shallow(
    <Title
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
        subtitle = { subtitle }
    />
);

describe(`Subtitle`, () => {
    test(`Should have 1 'h5' element`, () => {
        expect(result.find(`h5`).length).toBe(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have name is equaled to 'subtitle'`, () => {
        expect(result.find(`input`).props().name).toBe('subtitle');
    });

    test(`'input' element should have value is equaled to received 'subtitle' prop`, () => {
        expect(result.find('input').props().value).toBe(subtitle);
    });
});
