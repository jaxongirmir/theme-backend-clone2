const AJV = require('ajv')
const ajv = new AJV()

async function validate(schema, data) {
  const valid = ajv.validate(schema, data)
  if (valid) return null
  return ajv.errorsText()
}

class ThemeValidation {
  async validateTheme(req, res, next) {
    const schema = {
      type: 'object',
      properties: {
        titleTheme: { type: 'string' },
        roadmap: { type: 'array', items: { type: 'string' } },
        newWords: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              uzb: { type: 'string' },
              eng: { type: 'string' },
            },
            required: ['uzb', 'eng'],
            additionalProperties: false,
          },
        },
        video: { type: 'string' },
        test: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              variants: { type: 'array', items: { type: 'string' } },
              correctVariant: { type: 'string' },
            },
            required: ['question', 'variants', 'correctVariant'],
            additionalProperties: false,
          },
        },
        infoText: { type: 'string' },
        questions: { type: 'array', items: { type: 'string' } },
        addedTime: { type: 'number' },
      },
      required: [
        'titleTheme',
        'roadmap',
        'newWords',
        'video',
        'test',
        'infoText',
        'questions',
      ],
      additionalProperties: false,
    }

    const result = await validate(schema, req.body)
    if (!result) return next()
    res.status(400).send(result)
  }
}

module.exports = new ThemeValidation()
