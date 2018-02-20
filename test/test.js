
const {describe, it} = require('mocha');
const assert = require('assert');
const path = require('path');
const cwd = process.cwd();

describe('Node Require', function () {
    it('should return a list of emojis', function () {
        const emojis = require(path.join(cwd, 'src', 'index.node.js'));
        for (let emoji of Object.values(emojis)) {
            assert(emoji.title !== undefined, 'Title is missing');
        }
    });
});
