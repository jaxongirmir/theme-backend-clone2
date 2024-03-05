const { Schema, model } = require('mongoose')

const themeSchema = new Schema({
  titleTheme: { type: String },
  roadmap: [{ type: String }],
  newWords: [
    {
      uzb: { type: String },
      eng: { type: String },
    },
  ],
  video: { type: String },
  test: [
    {
      question: { type: String },
      variants: [{ type: String }],
      correctVariant: { type: String },
    },
  ],
  infoText: { type: String },
  questions: [{ type: String }],
  addedTime: { type: Number, default: new Date() },
})

const ThemeModel = model('Theme', themeSchema)

module.exports = ThemeModel
