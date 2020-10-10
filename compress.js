const fs = require("fs")
const imagemin = require("imagemin")
const imageminPngquant = require("imagemin-pngquant")

fs.rmdirSync("imgs", {recursive: true})

;(async () => {
  await imagemin(["emojis/*.png"], {
    destination: "imgs",
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ]
  })
})()
