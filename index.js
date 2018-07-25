const fs = require("fs")
const path = require("path")
const punycode = require("punycode")

const charToCode = char => {
  var points = punycode.ucs2.decode(char)
  return points.map(p => p.toString(16).padStart(4, "0")).join("-")
}

const codeToImg = code => {
  // handle edge cases
  switch(code) {
    case "1f937":
      return "1f937-2640"
    case "1f926":
      return "1f926-2642"
    case "1f5e8":
      return "1f441-1f5e8"
  }
  return code
    .replace(/200d-/g, "")
    .replace(/-fe0f/g, "")
}

const charToImg = char => codeToImg(charToCode(char)) + ".png"

exports.getImage = char => {
  const img = charToImg(char)
  if(fs.existsSync(path.join(__dirname, "imgs", img))) {
    return img
  }
  return null
}
