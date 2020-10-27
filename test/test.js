var assert = require('chai').assert;
var { similarSubstring } = require('../lib/index.js');

describe('similarString', () => {
    it('Try to find the word which is most similar to "Test", in the word "testing"', () => {
        const result = similarSubstring("testing", "Test");
        assert.equal(result.similarity, 0.75);
        assert.equal(result.items.length, 2);
        assert.deepInclude(result.items, {substring: 'est', range: { startIndex: 1, endIndex: 3}});
        assert.deepInclude(result.items, {substring: 'test', range: { startIndex: 0, endIndex: 3}});
    });

    it('Try to find the word which is most similar to "mod", from the paragraph "I am coding"', () => {
        const paragraph = "I am coding";
        const result = similarSubstring(paragraph, "mod");
        assert.equal(result.items.length, 2);
        assert.deepInclude(result.items, {substring: 'od', range: { startIndex: 6, endIndex: 7}});
        assert.deepInclude(result.items, {substring: 'cod', range: { startIndex: 5, endIndex: 7}});
    })

    it('Testing empty string for text input', () => {
        const results = similarSubstring("", "Test");
        assert.equal(results.length, 0);
    });

    it('Try finding the similar word from long paragraph', () => {
        const paragraph = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        const result = similarSubstring(paragraph, "printing and typesetting");
        assert.equal(result.items.length, 1);
        const firstItem = result.items[0];
        assert.equal(firstItem.substring, paragraph.substring(firstItem.range.startIndex, firstItem.range.endIndex + 1));
    });

    it('Try to find the similar word from a string with only one character', () => {
        const paragraph = "a";
        const result = similarSubstring(paragraph, "tesla");
        assert.equal(result.items.length, 1);
        const firstItem = result.items[0];
        assert.equal(firstItem.substring, paragraph.substring(firstItem.range.startIndex, firstItem.range.endIndex + 1));
    });

    it('Try to find a pattern with only single character from a string', () => {
        const paragraph = "Hello World";
        const result = similarSubstring(paragraph, "o");
        assert.equal(result.items.length, 2);
        assert.deepInclude(result.items, {substring: 'o', range: { startIndex: 4, endIndex: 4}});
        assert.deepInclude(result.items, {substring: 'o', range: { startIndex: 7, endIndex: 7}});
    });
})