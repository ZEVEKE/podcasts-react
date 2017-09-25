import React from 'react';
import { shallow } from 'enzyme';

import Description from './';
import Podcast from '../../Podcast';

const description = 'The description';
const result = shallow(
    <Description
        changeValue = { new Podcast().onFieldChanged }
        description = { description }
        isEdited = { false }
    />
);

describe(`Description`, () => {
    test(`Should have 1 'div' element`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 1 'h4' element`, () => {
        expect(result.find(`h4`).length).toBe(1);
    });

    test(`Should have 1 'textarea' element`, () => {
        expect(result.find(`textarea`).length).toBe(1);
    });

    test(`'textarea' name should be 'description'`, () => {
        expect(result.find(`textarea`).props().name).toBe('description');
    });

    test(`'textarea' value should be equaled to received 'description' prop`, () => {
        expect(result.find('textarea').props().value).toBe(description);
    });
});
