# 🙈 Emoji Images

Emoji images library.

this library has images for all emojis found in [emojilib](https://github.com/muan/emojilib) excepts which doesn't have `char` property.

## Install

```bash
npm install emojiimages
```

or

```bash
yarn add emojiimages
```

## Usage

pass emoji character to `getImage` and you are done.

```javascript
> var emojiimages = require("emojiimages")
> var img = emojiimages.getImage("🙈")
"1f648.png"
> emojiimages.getImage("no image found")
null
```
