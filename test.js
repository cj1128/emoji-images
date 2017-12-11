var emoji = require("emojilib")
var emojiImages = require("./index")
var test = require("tape")

test("every emoji which has char should have image", function(t) {
  emoji.ordered.forEach(key => {
    var obj = emoji.lib[key]
    if(obj.char != null) {
      var img = emojiImages.getImage(obj.char)
      t.notEqual(img, null, `${obj.char} should have corresponding image`)
    }
  })
  t.end()
})



