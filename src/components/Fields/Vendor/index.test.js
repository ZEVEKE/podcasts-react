import React from 'react';
import { shallow } from 'enzyme';

import Vendor from './';
import Podcast from '../../Podcast';

const vendor = 'AB';
const result = shallow(
    <Vendor
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
        vendor = { vendor }
    />
);

describe(`Vendor`, () => {
    test(`Should have 1 'div' element`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 1 'span' element`, () => {
        expect(result.find(`span`).length).toBe(1);
    });

    test(`Should have 1 'input' element`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have name is equaled to 'vendor'`, () => {
        expect(result.find(`input`).props().name).toBe('vendor');
    });

    test(`'input' element should have value is equaled to received 'vendor' prop`, () => {
        expect(result.find('input').props().value).toBe(vendor);
    });
});
