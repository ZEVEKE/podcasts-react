import React from 'react';
import { shallow } from 'enzyme';

import Complete from './';
import Podcast from '../../Podcast';

let result = shallow(
    <Complete
        changeValue = { new Podcast().onFieldChanged }
        complete = { false }
        isEdited = { false }
    />
);

describe(`Complete`, () => {
    test(`Should have 1 'div' element`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 1 'span' element`, () => {
        expect(result.find(`span`).length).toBe(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have name is equaled to 'complete'`, () => {
        expect(result.find(`input`).props().name).toBe('complete');
    });

    test(`'input' element should have 'text' type if 'isEdited' prop is 'false'`, () => {
        expect(result.find(`input`).props().type).toBe('text');
    });

    test(`'input' element should have value 'No' if received 'complete' prop is 'false'`, () => {
        expect(result.find('input').get(0).props.value).toBe('No');
    });

    test(`'input' element should have value 'Yes' if received 'complete' prop is 'true'`, () => {
        result = shallow(
            <Complete
                complete
                changeValue = { new Podcast().onFieldChanged }
                isEdited = { false }
            />
        );
        expect(result.find('input').get(0).props.value).toBe('Yes');
    });

    test(`'input' element should have 'checkbox' type if 'isEdited' prop is 'true'`, () => {
        result = shallow(
            <Complete
                isEdited
                changeValue = { new Podcast().onFieldChanged }
                complete = { false }
            />
        );

        expect(result.find(`input`).props().type).toBe('checkbox');
    });

    test(`'input' element should have value is equaled to received 'complete' prop`, () => {
        expect(result.find('input').props().checked).toBe(false);
    });
});
