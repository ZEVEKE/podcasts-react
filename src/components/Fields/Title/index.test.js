import React from 'react';
import { shallow } from 'enzyme';

import Title from './';
import Podcast from '../../Podcast';

const title = 'The title';
const result = shallow(
    <Title
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
        title = { title }
    />
);

describe(`Title`, () => {
    test(`Should have 1 'h1' element`, () => {
        expect(result.find(`h1`).length).toBe(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have name is equaled to 'title'`, () => {
        expect(result.find(`input`).props().name).toBe('title');
    });

    test(`'input' element should have value is equaled to received 'title' prop`, () => {
        expect(result.find('input').props().value).toBe(title);
    });
});
