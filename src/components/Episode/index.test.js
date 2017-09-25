import React from 'react';
import { shallow } from 'enzyme';

import { getUniqueID, getCurrentTime } from '../../helpers';
import Episode from './';
import Podcast from '../Podcast';

const podcastInstance = new Podcast();

const props = {
    author:         'John Wilkinson',
    date:           getCurrentTime(),
    deleteMyself:   podcastInstance.deleteEpisode,
    description:    'The description',
    editMyself:     podcastInstance.editEpisode,
    explicit:       false,
    fieldIsChanged: podcastInstance.episodeChanged,
    id:             getUniqueID(15),
    isEdited:       false,
    isParentEdited: false,
    saveMyself:     podcastInstance.saveEpisode,
    title:          'The title'
};

let result = shallow(
    <Episode
        { ...props }
    />
);
const onDeleteClicked = new Episode().onDeleteClicked;
const onEditClicked = new Episode().onEditClicked;
const onSaveClicked = new Episode().onSaveClicked;

describe(`Episode`, () => {
    test(`onDeleteClicked is a function`, () => {
        expect(typeof onDeleteClicked).toBe('function');
    });

    test(`onEditClicked is a function`, () => {
        expect(typeof onEditClicked).toBe('function');
    });

    test(`onSaveClicked is a function`, () => {
        expect(typeof onSaveClicked).toBe('function');
    });

    test(`Should have 1 'div' element`, () => {
        expect(result.find(`div`).length).toBe(1);
    });

    test(`Should have 5 'input' elements`, () => {
        result = shallow(
            <Episode
                { ...props }
                isEdited
                isParentEdited
            />
        );

        expect(result.find(`input`).length).toBe(5);
    });

    test(`Fourth 'input' element should have 'checkbox' type if 'isEdited' prop is 'true'`, () => {
        result = shallow(
            <Episode
                { ...props }
                isEdited
                isParentEdited
            />
        );

        expect(result.find(`input`).get(3).props.type).toBe('checkbox');
    });

    test(`Fourth 'input' element should have value is equaled to received 'explicit' prop`, () => {
        expect(result.find('input').get(3).props.checked).toBe(false);
    });
});
