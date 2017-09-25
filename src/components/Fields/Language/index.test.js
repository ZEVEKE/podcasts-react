import React from 'react';
import { shallow } from 'enzyme';

import Language from './';
import Podcast from '../../Podcast';

import config from '../../../adds';

const language = {
    name: 'English',
    id:   'us'
};

let result = shallow(
    <Language
        changeValue = { new Podcast().onFieldChanged }
        isEdited = { false }
        language = { language }
    />,
    { context: { languages: config.languages }}
);

describe(`Language`, () => {
    test(`Should have 1 'div' element if 'isEdited' prop is 'false'`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 2 'span' elements if 'isEdited' prop is 'false'`, () => {
        expect(result.find(`span`).length).toBe(2);
    });

    test(`Should have 2 'div' elements if 'isEdited' prop is 'true'`, () => {
        result = shallow(
            <Language
                isEdited
                changeValue = { new Podcast().onFieldChanged }
                language = { language }
            />,
            { context: { languages: config.languages }}
        );

        expect(result.find(`div`).length).toBe(2);
    });

    test(`Should have 1 'select' element if 'isEdited' prop is 'true'`, () => {
        expect(result.find(`select`).length).toBe(1);
    });

    test(`'select' element should have name is equaled to 'language'`, () => {
        expect(result.find(`select`).props().name).toBe('language');
    });

    test(`'select' element should have value is equaled to received 'language.id' prop`, () => {
        expect(result.find('select').props().value).toBe(language.id);
    });
});
