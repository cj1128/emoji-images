// generate new emojis.json based on `emojilib`'s emojis.json
// add `img` field

const punycode = require("punycode")
const fs = require("fs")
const { getImage } = require("./index")

const emojis = Object.entries(require("emojilib/emojis.json")).map(([key, value]) => ({
  name: key,
  ...value,
}))

const results = emojis
  .filter(emoji => emoji.char)
  .filter(emoji => {
    if(getImage(emoji.char)) return true
    console.warn(`no image found for '${emoji.char}', name: ${emoji.name}`)
  })
  .map(emoji => ({...emoji, img: getImage(emoji.char)}))

fs.writeFileSync("emojis.json", JSON.stringify(results, null, "  "))

console.log("Done, total:", results.length)
