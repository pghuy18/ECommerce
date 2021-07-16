const Joi = require('@hapi/joi')
    // .extend(require('@hapi/joi-date'));

// Register Validate
const registerValidation = function(data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(4)
                .required(),
            username: Joi.string()
                .trim() // no white space
                .min(4)
                .empty(/\s+/)
                .required()
                .messages({
                    'string.username': 'username must be a valid username ',
                    'string.trim': 'username may not contain any spaces at the beginning or end', // seems to be unnecessary
                    'string.empty': 'username is not have white space'
                }),
            email: Joi.string()
                .email()
                .min(6)
                .required()
                .messages({
                    'string.email': 'email must be a valid email ',
                    'string.empty': 'email is required'
                }),
            password: Joi.string()
                .min(6)
                .required(),
            type: Joi.string()
                .valid('lecturer', 'student')
                .required(),
            birthyear: Joi.number()
                .max(2021)
                .integer()
                .min(0)
                .required()
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