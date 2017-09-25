import React from 'react';
import { shallow } from 'enzyme';

import Owner from './';
import Podcast from '../../Podcast';

const owner = {
    name:  'Adam Smith',
    email: 'adam.smith@example.net'
};
const result = shallow(
    <Owner
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
        owner = { owner }
    />
);

describe(`Owner`, () => {
    test(`Should have 3 'div' elements`, () => {
        expect(result.find(`div`).length).toBe(3);
    });

    test(`Should have 1 'h5' element`, () => {
        expect(result.find(`h5`).length).toBe(1);
    });

    test(`Should have 2 'input' elements`, () => {
        expect(result.find(`input`).length).toBe(2);
    });

    test(`'input' elements should have 'text' type`, () => {
        expect(result.find(`input`).get(0).props.type).toBe('text');
    });

    test(`'input' elements should have 'text' type`, () => {
        expect(result.find(`input`).get(1).props.type).toBe('email');
    });

    test(`first 'input' element should have name is equaled 'ownerName'`, () => {
        expect(result.find(`input`).get(0).props.name).toBe('ownerName');
    });

    test(`second 'input' element should have name is equaled 'ownerEmail'`, () => {
        expect(result.find(`input`).get(1).props.name).toBe('ownerEmail');
    });

    test(`first 'input' element should have value is equaled to received 'owner.name' prop`, () => {
        expect(result.find('input').get(0).props.value).toBe(owner.name);
    });

    test(`second 'input' element should have value is equaled to received 'owner.email' prop`, () => {
        expect(result.find('input').get(1).props.value).toBe(owner.email);
    });
});
