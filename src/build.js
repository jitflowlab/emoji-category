
const fetch = require('node-fetch');
const twemoji = require('twemoji');
const emoji = require('node-emoji');
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const distFile = path.join(cwd, 'dist', 'emoji-category.json');
const categories = {};

console.group('Building...');
fetch('https://raw.githubusercontent.com/github/gemoji/master/db/Category-Emoji.json').then(async res => {
    const response = await res.json();
    for (let data of response.EmojiDataArray) {
        const images = data.CVCategoryData.Data.split(',').map(e => e.trim());
        const key = data.CVDataTitle.replace('EmojiCategory-', '').toLowerCase();

        console.group(' -> ', key);
        categories[key] = {
            title: key,
            emojis: []
        };
        images.forEach(image => {
            let img = null;
            twemoji.parse(image, (icon, options) => {
                img = ''.concat(twemoji.base, options.size, '/', icon, options.ext);
            });
            const str = emoji.unemojify(image);
            categories[key].emojis.push({
                emoji: image,
                str: str,
                img: img
            });
            console.log(' -> ', str);
        });
        console.groupEnd();
    }
    fs.writeFileSync(distFile, JSON.stringify(categories, null, 4));
    console.log('Done!');
    console.groupEnd();
    console.log('Dist file:', distFile);
});
