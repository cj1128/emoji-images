import "virtual:windi.css"
import JSZip from "jszip"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let demoEmoji = "🤒"
// let demoEmoji = "👩‍🍳"
// let demoEmoji = "👩‍✈️"

$$("form input").forEach((ele) => {
  ele.addEventListener("change", () => {
    drawEmoji()
  })
})

const draw = (canvas, canvasSize, text, fontSize, yOffset) => {
  canvas.width = canvasSize
  canvas.height = canvasSize
  const ctx = canvas.getContext("2d")

  ctx.font = `${fontSize}px Apple Color Emoji`

  const metric = ctx.measureText(text)
  const x = (canvasSize - metric.width) / 2
  const y =
    (canvasSize - metric.actualBoundingBoxAscent) / 2 +
    metric.actualBoundingBoxAscent +
    yOffset
  ctx.fillText(text, x, y)

  return ctx.getImageData(canvasSize / 2, canvasSize / 2, 1, 1).data[3] !== 0
}

const drawEmoji = (emoji = demoEmoji, canvas = $("#demo")) => {
  const canvasSize = Number($("#canvasSize").value)
  const fontSize = Number($("#fontSize").value)
  const yOffset = Number($("#yOffset").value)

  return draw(canvas, canvasSize, emoji, fontSize, yOffset)
}

const saveAs = (blob, name) => {
  const link = document.createElement("a")
  link.download = name
  link.href = URL.createObjectURL(blob)
  link.click()
}

// get emojis from emoji-sequences.txt and supplement.txt
const getEmojis = async () => {
  const result = {
    emojis: [],
    sequencesDate: "",
    sequencesVersion: "",
    sequencesCount: 0,
    supplementCount: 0,
  }

  const sequencesContent = await fetch("emoji-sequences.txt").then((res) =>
    res.text()
  )

  sequencesContent
    .split("\n")
    .filter((line) => {
      const datePrefix = "# Date: "
      if (line.startsWith(datePrefix)) {
        result.sequencesDate = line.slice(datePrefix.length).split(", ")[0]
      }

      const versionPrefix = "# Version: "

      if (line.startsWith(versionPrefix)) {
        result.sequencesVersion = line.slice(versionPrefix.length)
      }

      return !line.startsWith("#")
    })
    .filter((line) => line.trim() !== "")
    .forEach((line) => {
      const points = line.split(";")[0].trim()
      if (points.includes("..")) {
        const [left, right] = points.split("..")
        const leftNum = parseInt(left, "16")
        const rightNum = parseInt(right, "16")
        for (let i = leftNum; i <= rightNum; i++) {
          result.sequencesCount++
          result.emojis.push([i])
        }
      } else if (points.includes(" ")) {
        result.sequencesCount++
        result.emojis.push(points.split(" ").map((str) => parseInt(str, "16")))
      } else {
        result.sequencesCount++
        result.emojis.push([parseInt(points, "16")])
      }
    })

  if (result.sequencesDate === "" || result.sequencesVersion === "") {
    throw new Error("could not parse date and version of emoji sequences")
  }

  const supplementContent = await fetch("supplement.txt").then((res) =>
    res.text()
  )
  supplementContent
    .split("\n")
    .filter((line) => line.trim() !== "")
    .forEach((line) => {
      result.supplementCount++
      result.emojis.push(
        line
          .split(";")[0]
          .trim()
          .split(" ")
          .map((s) => parseInt(s, "16"))
      )
    })

  return result
}

$("#download").addEventListener("click", () => {
  $("#demo").toBlob((blob) => {
    saveAs(blob, "emoji.png")
  }, "image/png")
})

const drawPoints = (zip, canvas, points) => {
  const filename = points.map((num) => num.toString(16)).join("-") + ".png"
  drawEmoji(String.fromCodePoint(...points), canvas)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      zip.file(filename, blob)
      resolve()
    })
  })
}

const init = () => {
  drawEmoji()

  getEmojis()
    .then((result) => {
      $("#sequencesVersion").innerText = result.sequencesVersion
      $("#sequencesDate").innerText = result.sequencesDate
      $("#sequencesCount").innerText = result.sequencesCount
      $("#supplementCount").innerText = result.supplementCount
      $("#totalCount").innerText =
        result.sequencesCount + result.supplementCount

      $("#shuffle").addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * result.emojis.length)
        demoEmoji = String.fromCodePoint(...result.emojis[randomIndex])
        console.log("emoji", result.emojis[randomIndex], demoEmoji)
        drawEmoji()
      })

      $("#downloadAll").addEventListener("click", async () => {
        const zip = new JSZip()
        const root = zip.folder("emojis")
        const canvas = $("#offscreen")

        NProgress.start()

        await Promise.all(
          result.emojis.map((points) =>
            drawPoints(root, canvas, points).then(() => NProgress.inc())
          )
        )

        console.log("All drawn")

        zip.generateAsync({ type: "blob" }).then((blob) => {
          NProgress.done()
          saveAs(
            blob,
            `emojis_${result.sequencesVersion}_${result.sequencesDate}.zip`
          )
        })
      })
    })
    .catch(() => {
      alert("Could not load emoji-sequences.txt")
    })
}

init()
