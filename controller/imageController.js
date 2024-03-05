const imgDB = require('../models/imageModel')
const fs = require('fs')

// Create image

const createImg = async (req, res) => {
  try {
    const imageUrl = `https://theme-backend-clone2.onrender.com/profile/${req.file.filename}`
    const image = new imgDB({ imageUrl })
    const saved = await image.save()
    res.json({
      success: 1,
      msg: 'The img successfuly saved',
      innerData: saved,
    })
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: 'Failed to save image to database',
      error: error.message,
    })
  }
}

// get all imgs

const getAllImgs = async (req, res) => {
  try {
    let AllImgs = await imgDB.find()
    if (!AllImgs.length) {
      return res.status(404).json({
        status: 'warning',
        msg: 'Imgs are not found',
        innerData: AllImgs,
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'Imgs are found',
      innerData: AllImgs,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err, innerData: null })
  }
}
// delete img

const deleteImg = async (req, res) => {
  const { id } = req.body
  try {
    const img = await imgDB.findById(id)
    if (!img) {
      return res.status(404).json({
        status: 'warning',
        msg: 'Img is not found',
        innerData: img,
      })
    }
    const { imageUrl } = img
    const pieces = imageUrl.split('/')
    const imagetoDelete = pieces[pieces.length - 1]
    const filePath = `./upload/images/${imagetoDelete}`

    let deletedImg = await imgDB.findByIdAndDelete(id)

    fs.unlink(filePath, err => {
      if (err) {
        console.error('Error with deleting file:', err)
        return res.status(500).json({ msg: 'error', innerData: null })
      }
      console.log('File successfully deleted')
      res.json({ msg: 'Img was deleted', innerData: deletedImg })
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ msg: 'error', innerData: null })
  }
}

// Get Count All Imgs

const getAllCounimgs = async (req, res) => {
  try {
    const count = await imgDB.countDocuments()
    res.status(200).json({
      status: 'success',
      msg: 'Total count of imgs',
      count: count,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, count: null })
  }
}

module.exports = { createImg, getAllImgs, deleteImg, getAllCounimgs }
