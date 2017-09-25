import React from 'react';
import { shallow } from 'enzyme';

import Explicit from './';
import Podcast from '../../Podcast';

let result = shallow(
    <Explicit
        changeValue = { new Podcast().onFieldChanged }
        explicit = { false }
        isEdited = { false }
    />
);

describe(`Explicit`, () => {
    test(`Should have 1 'div' element`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 1 'span' element`, () => {
        expect(result.find(`span`).length).toBe(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have name is equaled to 'explicit'`, () => {
        expect(result.find(`input`).props().name).toBe('explicit');
    });

    test(`'input' element should have 'text' type if 'isEdited' prop is 'false'`, () => {
        expect(result.find(`input`).props().type).toBe('text');
    });

    test(`'input' element should have value 'No' if received 'explicit' prop is 'false'`, () => {
        expect(result.find('input').get(0).props.value).toBe('No');
    });

    test(`'input' element should have value 'Yes' if received 'explicit' prop is 'true'`, () => {
        result = shallow(
            <Explicit
                explicit
                changeValue = { new Podcast().onFieldChanged }
                isEdited = { false }
            />
        );
        expect(result.find('input').get(0).props.value).toBe('Yes');
    });

    test(`'input' element should have 'checkbox' type if 'isEdited' prop is 'true'`, () => {
        result = shallow(
            <Explicit
                isEdited
                changeValue = { new Podcast().onFieldChanged }
                explicit = { false }
            />
        );

        expect(result.find(`input`).props().type).toBe('checkbox');
    });

    test(`'input' element should have value is equaled to received 'explicit' prop`, () => {
        expect(result.find('input').props().checked).toBe(false);
    });
});
