import React from 'react';
import { shallow } from 'enzyme';

import Image from './';
import Podcast from '../../Podcast';

import chooseCover from '../../../theme/assets/choose-image.png';

const image = 'data:image/jpeg;base64,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 ';

let result = shallow(
    <Image
        changeValue = { new Podcast().onFieldChanged }
        image = { image }
        isEdited = { false }
    />
);

describe(`Image`, () => {
    test(`Should have 1 'div' element`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 1 'img' element if 'isEdited' prop is false`, () => {
        expect(result.find(`img`).length).toBe(1);
    });

    test(`Should have 2 'img' elements if 'isEdited' prop is true`, () => {
        result = shallow(
            <Image
                isEdited
                changeValue = { new Podcast().onFieldChanged }
                image = { image }
            />
        );

        expect(result.find(`img`).length).toBe(2);
    });

    test(`Should have 1 'input' element if 'isEdited' prop is true`, () => {
        expect(result.find(`input`).length).toBe(1);
    });

    test(`'input' element should have 'image' name`, () => {
        expect(result.find(`input`).props().name).toBe('image');
    });

    test(`'input' element should have 'file' type`, () => {
        expect(result.find(`input`).props().type).toBe('file');
    });

    test(`First 'img' element should have src is equaled to received 'image' prop`, () => {
        expect(result.find(`img`).get(0).props.src).toBe(image);
    });

    test(`Second 'img' element should have necessary src`, () => {
        expect(result.find(`img`).get(1).props.src).toBe(chooseCover);
    });
});
