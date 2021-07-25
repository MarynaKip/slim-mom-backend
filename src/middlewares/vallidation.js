const Joi = require('joi')

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.message })
  }
  next()
}

const validationData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3).max(30).required(),
    phone: Joi.string()
      .min(7)
      .max(10)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  })
  checkValidation(schema, req, res, next)
}

const authorizationValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    height: Joi.string().min(3).max(30).required(),
    currentWeight: Joi.string().min(2).max(3).required(),
    desiredWeight: Joi.string().min(2).max(3).required(),
    bloodType: Joi.string().min(1).max(1).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required()
  })
  checkValidation(schema, req, res, next)
}

module.exports = { validationData, authorizationValidation }
