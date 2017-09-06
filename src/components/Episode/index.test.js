import React from 'react';
import { shallow } from 'enzyme';

import { episode } from './Mock/data.json';

import { createEpisode, exitWithoutSaving } from '../Podcast';
import Episode from './';

const state = {
    mode: `preview`
};
const props = {
    id:          '001',
    title:       'TITLE',
    description: 'DESCRIPTION',
    release:     'RELEASE',
    createEpisode,
    exitWithoutSaving
};

const result = shallow(
    <Episode
        createEpisode = { props.createEpisode }
        description = { props.description }
        exitWithoutSaving = { props.exitWithoutSaving }
        id = { props.id }
        release = { props.release }
        title = { props.title }
    />, { state }
);
const message = 'Lorem ipsum';
const {
    handleEdit,
    handleTitleInputChange,
    handleDescriptionInputChange,
    handleExplicitInputClicked,
    handleSave,
    handleCancel
} = new Episode();

describe(`Episode`, () => {
    test(`handleEdit is a function`, () => {
        expect(typeof handleEdit).toBe('function');
    });

    test(`handleTitleInputChange is a function`, () => {
        expect(typeof handleTitleInputChange).toBe('function');
    });

    test(`handleDescriptionInputChange is a function`, () => {
        expect(typeof handleDescriptionInputChange).toBe('function');
    });

    test(`handleExplicitInputChange is a function`, () => {
        expect(typeof handleExplicitInputClicked).toBe('function');
    });

    test(`handleSave is a function`, () => {
        expect(typeof handleSave).toBe('function');
    });

    test(`handleCancel is a function`, () => {
        expect(typeof handleCancel).toBe('function');
    });


    test(`Should have 1 'form' element`, () => {
        expect(result.find(`form`).length).toBe(1);
    });
    //
    // test(`Should have 1 'title' element`, () => {
    //     expect(result.find(`title`).length).toBe(1);
    // });
    //
    // test(`Should have 1 'description' element`, () => {
    //     expect(result.find(`description`).length).toBe(1);
    // });
    //
    // test(`Should have 1 'explicit' element`, () => {
    //     expect(result.find(`explicit`).length).toBe(1);
    // });

    test(`Should have 5 'div' elements, when state.mode = 'preview'`, () => {
        expect(result.find(`div`).length).toBe(5);
    });

    test(`Should have 1 'input' elements, when state.mode = 'preview'`, () => {
        expect(result.find(`input`).length).toBe(1);
    });


    test(`Should have 4 'div' elements, when state.mode = 'edit'`, () => {
        result.setState({ mode: 'edit' });

        expect(result.find(`div`).length).toBe(4);
    });

    test(`Should have 1 'textarea' elements, when state.mode = 'preview'`, () => {
        expect(result.find(`textarea`).length).toBe(1);
    });

    test(`Should have 3 'input' elements, when state.mode = 'editing'`, () => {
        result.setState({ mode: 'edit' });
        expect(result.find(`input`).length).toBe(3);
    });

    test(`Should have 1 'submit' element, when state.mode = 'editing'`, () => {
        expect(result.find(`submit`).length).toBe(1);
    });

    test(`component state & input 'title' values should reflect according changes if any text input provided`, () => {
        result.find('title').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state().title).toBe(message);
        expect(result.find('title').get(0).props.value).toBe(message);
    });

    test(`component state & input 'description' values should reflect according changes if any text input provided`, () => {
        result.find('description').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state().description).toBe(message);
        expect(result.find('description').get(0).props.value).toBe(message);
    });

    test(`component state & input 'explicit' values should reflect according changes if checkbox state changed`, () => {
        result.find('explicit').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state().description).toBe(message);
        expect(result.find('description').get(0).props.value).toBe(message);
    });
});

describe(`Episode.handleInputIdChange`, () => {
});

describe(`Episode.handleInputNameChange`, () => {
    expect(typeof handleInputIdChange).toBe('function');
});
