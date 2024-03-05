const themeDB = require('../models/themeModel')

// create theme

const createTheme = async (req, res) => {
  try {
    let task = await themeDB.create(req.body)
    let saved = await task.save()
    res.status(201).json({
      status: 'success',
      msg: 'Theme is created',
      innerData: saved,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err, innerData: null })
  }
}

// get one theme

const getOneTheme = async (req, res) => {
  const { id } = req.body
  try {
    let AllTheme = await themeDB.findById(id)
    console.log(AllTheme)
    if (!AllTheme) {
      return res.status(404).json({
        status: 'warning',
        msg: 'Theme is not found',
        innerData: AllTheme,
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'Theme is found',
      innerData: AllTheme,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err, innerData: null })
  }
}

// Get all themes

const getAllTheme = async (req, res) => {
  try {
    let AllThemes = await themeDB.find()
    if (!AllThemes.length) {
      return res.status(404).json({
        status: 'warning',
        msg: 'Themes are not found',
        innerData: AllThemes,
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'Themes are found',
      innerData: AllThemes,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err, innerData: null })
  }
}

// Get Count All Theme

const getAllCountheme = async (req, res) => {
  try {
    const count = await themeDB.countDocuments()
    res.status(200).json({
      status: 'success',
      msg: 'Total count of theme',
      count: count,
    })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, count: null })
  }
}

// Delete one theme

const deleteTheme = async (req, res) => {
  try {
    const { id } = req.body
    let deletedTheme = await themeDB.findByIdAndDelete(id)
    if (!deletedTheme) {
      return res
        .status(404)
        .json({ msg: 'Theme is not found', innerData: deletedTheme })
    }
    res.send({ msg: 'Theme is deleted', innerData: deletedTheme })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null })
  }
}
// Delete all themes

const deleteAllTheme = async (req, res) => {
  try {
    const { deletedCount } = await themeDB.deleteMany()
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ msg: 'No themes found to delete', deletedCount })
    }
    res.status(200).json({ msg: 'All themes are deleted', deletedCount })
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message, innerData: null })
  }
}

module.exports = {
  createTheme,
  getAllTheme,
  getOneTheme,
  deleteTheme,
  deleteAllTheme,
  getAllCountheme,
}
