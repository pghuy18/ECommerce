const Joi = require('@hapi/joi')
    // .extend(require('@hapi/joi-date'));

// Register Validate
const registerValidation = function(data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(4)
                .required(),
            username: Joi.string()
                .trim()
                .min(4)
                .empty(/\s+/)
                .required()
                .messages({
                    'string.username': 'username must be a valid username ',
                    'string.trim': 'username may not contain any spaces at the beginning or end', // seems to be unnecessary
                    'string.empty': 'username is not have white space'
                }),
            password: Joi.string()
                .min(6)
                .required(),
        })
        return schema.validate(data)
    }
    // Login Validate
const loginValidation = function(data) {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(4)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    })
    return schema.validate(data)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation