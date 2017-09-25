import React from 'react';
import { shallow } from 'enzyme';

import Category from './';
import Podcast from '../../Podcast';

import config from '../../../adds';

const category = {
    group: 'Arts',
    name:  'Literature'
};

let result = shallow(
    <Category
        category = { category }
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
    />,
    { context: { categories: config.categories }}
);

describe(`Category`, () => {
    test(`Should have 1 'div' element if 'isEdited' prop is 'false'`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 2 'span' elements if 'isEdited' prop is 'false'`, () => {
        expect(result.find(`span`).length).toBe(2);
    });

    test(`Should have 2 'div' elements if 'isEdited' prop is 'true'`, () => {
        result = shallow(
            <Category
                isEdited
                category = { category }
                changeValue = { new Podcast().onFieldChanged }
            />,
            { context: { categories: config.categories }}
        );

        expect(result.find(`div`).length).toBe(2);
    });

    test(`Should have 1 'select' element if 'isEdited' prop is 'true'`, () => {
        expect(result.find(`select`).length).toBe(1);
    });

    test(`'select' element should have name is equaled to 'category'`, () => {
        expect(result.find(`select`).props().name).toBe('category');
    });

    test(`'select' element should have value is equaled to received 'category.name' prop`, () => {
        expect(result.find('select').props().value).toBe(category.name);
    });
});
