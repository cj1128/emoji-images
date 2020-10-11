const imagemin = require("imagemin")
const imageminPngquant = require("imagemin-pngquant")

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
