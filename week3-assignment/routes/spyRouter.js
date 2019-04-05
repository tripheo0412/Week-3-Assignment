const express = require("express")
const urlencodedParser = require("body-parser")
const path = require("path")
const multer = require("multer")
const router = express.Router()
const spyController = require("../controllers/spyController")
const thumbnail = require("../modules/thumbnail")
// set up file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "spy-sites/original")
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage })
router.get("/all", (req, res) => {
  spyController.spy_list_get().then(result => {
    res.send(result)
  })
})

router.post("/new", upload.single("file"), (req, res) => {
  const file = req.file
  req.body.thumbnail = "thumb/" + file.filename
  req.body.image = "img/" + file.filename
  req.body.original = "original/" + file.filename
  req.body.time = new Date().getTime()

  const small = thumbnail.getThumbnail(
    "spy-sites/" + req.body.original,
    "spy-sites/" + req.body.thumbnail,
    300,
    300
  )

  const medium = thumbnail.getThumbnail(
    "spy-sites/" + req.body.original,
    "spy-sites/" + req.body.image,
    720,
    480
  )

  const data = req.body
  console.log(data)
  spyController.spy_create_post(data).then(result => {
    res.send(result)
  })
})

router.get("/number", (req, res) => {
  spyController.spy_number_get().then(result => {
    res.send(`Got ${result} spies`)
  })
})

router.get("/sort", (req, res) => {
  spyController.spy_sort_get().then(result => {
    let text = ""
    result.forEach(spy => {
      text += spy.name + "<br>"
    })
    res.send(text)
  })
})

router.get("/posts", (req, res) => {
  spyController.spy_list_get().then(result => {
    res.send(result)
  })
})

router.delete("/posts/:id", (req, res) => {
  spyController.spy_delete_record(req.params.id).then(result => {
    res.send(result)
  })
})

router.patch("/posts/:imageId", urlencodedParser, (req, res) => {
  spyController.spy_update_record(req.params.imageId, req.body).then(result => {
    res.send(res)
  })
})
module.exports = router
