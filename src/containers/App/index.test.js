import React from 'react';
import { shallow } from 'enzyme';

import App from './';

const result = shallow(
    <App />
);

describe(`App`, () => {
    test(`Should contain only 'Main' component`, () => {
        expect(result.find(`section`).children().length).toBe(1);
        expect(result.find(`Main`).length).toBe(1);
    });
});
