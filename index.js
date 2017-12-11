var fs = require("fs")
var path = require("path")
var punycode = require("punycode")

function getImage(char) {
  var code = charToCode(char)
  var imgid = codeToImageID(code)
  var imgPath = path.join(__dirname, "imgs", imgid + ".png")
  if(fs.existsSync(imgPath)) {
    return imgid + ".png"
  }
  return null
}

function charToCode(char) {
  var points = punycode.ucs2.decode(char)
  return points.map(p => p.toString(16).padStart(4, "0")).join("-")
}

function codeToImageID(code) {
  // edge cases
  switch(code) {
    case "1f937":
      return "1f937-2640"
    case "1f926":
      return "1f926-2642"
    case "1f5e8":
      return "1f441-1f5e8"
  }
  var imgid = code
  imgid = imgid.replace(/200d-/g, "")
  imgid = imgid.replace(/-fe0f/g, "")
  return imgid
}

module.exports = {
  getImage,
}
