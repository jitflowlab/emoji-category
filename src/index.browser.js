
const emojis = require('./../dist/emoji-category.json');

const EmojiCategory = {
    get: function () {
        return emojis;
    }
};

window.EmojiCategory = module.exports = EmojiCategory;
