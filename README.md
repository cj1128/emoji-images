# 🙈 Emoji Images

[![npm version](https://badge.fury.io/js/emojiimages.svg)](https://badge.fury.io/js/emojiimages)

this library has png images(96 x 96) for all emojis found in [emojilib] excepts which doesn't have `char` property.

## Install

```bash
npm install emojiimages
```

or

```bash
yarn add emojiimages
```

## Usage

pass emoji character to `getImage` and find the file in `imgs` directory.

```javascript
> const emojiimages = require("emojiimages")
> const img = emojiimages.getImage("🙈")
"1f648.png"
> emojiimages.getImage("no image found")
null
```

or just get an big array contains all emojis and their image.

```javascript
> const emojis = require("emojiimages/emojis.json")
> emojis[0]
{ name: '100',
  keywords:
   [ 'score',
     'perfect',
     'numbers',
     'century',
     'exam',
     'quiz',
     'test',
     'pass',
     'hundred' ],
  char: '💯',
  fitzpatrick_scale: false,
  category: 'symbols',
  img: '1f4af.png' }
```

[emojilib]: https://github.com/muan/emojilib
