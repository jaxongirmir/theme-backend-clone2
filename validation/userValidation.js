const AJV = require('ajv')
const ajv = new AJV()

async function validate(schema, data) {
  const valid = ajv.validate(schema, data)
  if (valid) return null
  return ajv.errorsText()
}

class userValidation {
  async validateuser(req, res, next) {
    const schema = {
      type: 'object',
      properties: {
        fullName: { type: 'string', minLength: 6 },
        phoneNumber: { type: 'string', minLength: 13, maxLength: 13 },
        password: { type: 'string', minLength: 4, maxLength: 12 },
        information: { type: 'string' },
        role: { type: 'array', items: { type: 'string' } },
        status: { type: 'number' },
        addedTime: { type: 'number' },
      },
      required: ['fullName', 'phoneNumber', 'password'],
      additionalProperties: false,
    }

    const result = await validate(schema, req.body)
    if (!result) return next()
    res.status(400).send(result)
  }
}

module.exports = new userValidation()
