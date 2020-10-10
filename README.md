# 🙈 Emoji Images

[![npm version](https://badge.fury.io/js/emojiimages.svg)](https://badge.fury.io/js/emojiimages)

Images (200x200) for all emojis in [Unicode v13.1](https://unicode.org/Public/emoji/13.1/emoji-sequences.txt) (Date 2020-08-31), rendered in *Apple Color Emoji* font.

The unicode standard contains 2192 emojis, but few of them are not supported by the Apple Color Emoji font, so this library contains **2127** emoji images in total.

![](http://asset.cjting.cn/Fl94d35lOHoRctklj0MW8P5SRMhO.png)

## Install

```bash
$ yarn add emojiimages
$ ls node_modules/emojiimages/imgs
00a9.png         1f4a1.png       1f61c.png                    1f510.png
00ae.png         1f4a2.png       1f61d.png                    1f511.png
002a-20e3.png    1f4a3.png       1f61e.png                    1f512.png
0023-20e3.png    1f4a4.png       1f61f.png                    1f513.png
0030-20e3.png    1f4a5.png       1f62a.png                    1f514.png
0031-20e3.png    1f4a6.png       1f62b.png                    1f515.png
...
```

## Usage

All the images are in the `imgs` directory with unicode code points as the filename.

```js
const punycode = require("punycode")
const char = "🤒"
const filename = punycode.ucs2.decode(char).map(num => num.toString(16)).join("-") + ".png"
// Now we can get the emoji using this path
const filepath = `node_modules/emojiimages/imgs/${filename}`
```

## Generate

All the images are rendered by the browser. If you want emoji images in different size, follow these steps:

- Clone this repo 🚀
- Start a local server and open `generator.html` 🖱
- Adjust the params ⚙
- Click `Download` to download a preview image 🤓
- If everything is ok, click `Download All` to download all 2000+ images in on zip file 😆 (notice, this is gonna take a few minutes, just be patient)
- **Manually** recognize and delete the images which are not supported by the font 😭 (I hate to say this, but I couldn't find a way to reliably detect which emojis are not supported.)
- Compress the generated png images (optional) 🙃
- And you are done! 🎉
