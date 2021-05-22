/**
 * @jest-environment jsdom
 */

import { pushToHistory } from "../scripts/router";

// Test if the length of the history stack and the current state object is correct.
 describe('pushToHistory test', () => {
    let history;

    test('settings page', () => {
        history = pushToHistory('settings', '2');
        expect(history.length).toBe(2);
    });

    test('entry page', () => {
        history = pushToHistory('entry', '2');
        expect(history.length).toBe(3);
    })

    test('other page', () => {
        history = pushToHistory('', '2');
        expect(history.length).toBe(4);
    })

});
