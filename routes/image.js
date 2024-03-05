const { Router } = require('express')
const {
  deleteImg,
  getAllImgs,
  getAllCounimgs,
  createImg,
} = require('../controller/imageController')
const roleMiddleware = require('../middleware/roleMiddleware')
const multer = require('multer')
const path = require('path')

const image = Router()

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
})
image.post(
  '/upload',
  upload.single('image'),
  roleMiddleware(['TEACHER']),
  createImg
)

image.get('/allimages', getAllImgs)
image.get('/all-imgs-count', getAllCounimgs)
image.delete('/delete-img', roleMiddleware(['TEACHER']), deleteImg)
module.exports = image
