# 🙈 Emoji Images

this library has png images(96 x 96) for all emojis found in [emojilib](https://github.com/muan/emojilib) excepts which doesn't have `char` property.

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
> var emojiimages = require("emojiimages")
> var img = emojiimages.getImage("🙈")
"1f648.png"
> emojiimages.getImage("no image found")
null
```
