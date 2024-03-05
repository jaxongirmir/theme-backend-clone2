const { Router } = require('express')
const {
  createTheme,
  getAllTheme,
  deleteAllTheme,
  getOneTheme,
  deleteTheme,
  getAllCountheme,
} = require('../controller/themeController')
const themeValidation = require('../validation/themeValidation')
const roleMiddleware = require('../middleware/roleMiddleware')

const theme = Router()

theme.post(
  '/create-theme',
  [themeValidation.validateTheme],
  roleMiddleware(['TEACHER']),
  createTheme
)
theme.get('/allthemes', getAllTheme)
theme.get('/get-one-theme', getOneTheme)
theme.get('/all-themes-count', getAllCountheme)
theme.delete('/delete-one-theme', roleMiddleware(['TEACHER']), deleteTheme)
theme.delete('/delete-all-theme', roleMiddleware(['TEACHER']), deleteAllTheme)
module.exports = theme
