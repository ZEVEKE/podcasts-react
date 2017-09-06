import { getRandomColor, getUniqueID, getCurrentTime } from './';

// Test utilities
const length = 15;

describe(`helpers: `, () => {
    test(`getRandomColor should be a function`, () => {
        expect(typeof getRandomColor).toBe(`function`);
    });

    test(`getRandomColor returns string`, () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test(`getRandomColor returns color in format '#AAAAAA' where A is any char of pattern [a-bA-Z0-9]`,
        () => {
            for (let i = 0; i < 100; i++) {
                const result = getRandomColor();

                expect(result.length).toBe(7);
                expect(result.search(/(#[a-f0-9]{6})/gi)).not.toBe(-1);
            }
        }
    );

    test(`getUniqueID should be a function`, () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test(`getUniqueID has a valid type of returned value`, () => {
        expect(typeof getUniqueID(length)).toBe('string');
    });

    test(`getUniqueID function should throw an error if non-number argument were passed`,
        () => {
            function getUniqueIDWithError () {
                getUniqueID(null);
            }

            expect(getUniqueIDWithError).toThrowError(
                `passed argument should be a number`
            );
        }
    );

    test(`getUniqueID return string having length is equaled to received argument`, () => {
        expect(getUniqueID(length).length).toBe(length);
    });

    test(`getCurrentTime should be a function`, () => {
        expect(typeof getCurrentTime).toBe(`function`);
    });

    test(`getCurrentTime return string`, () => {
        expect(typeof getCurrentTime()).toBe('string');
    });
});
