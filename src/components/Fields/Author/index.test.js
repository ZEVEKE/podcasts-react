import React from 'react';
import { shallow } from 'enzyme';

import Author from './';
import Podcast from '../../Podcast';

const author = 'Jack London';
const result = shallow(
    <Author
        author = { author }
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
    />
);

describe(`Author`, () => {
    test(`Should have 1 'h2' element`, () => {
        expect(result.find(`h2`).length).toBe(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have name is equaled to 'author'`, () => {
        expect(result.find(`input`).props().name).toBe('author');
    });

    test(`'input' element should have value is equaled to received 'author' prop`, () => {
        expect(result.find('input').props().value).toBe(author);
    });
});
