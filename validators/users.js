//Validating the data
const Joi = require("joi");

//Schema here is different from Mongoose Schema
//Why need this validator? because Mongoose schema has limited validation

//It will help you convert numbers which read as string in backend to integer
//Helps you parse into correct data type
const validators = {
    registerValidator: Joi.object({
        fullname: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confirm_password: Joi.string().min(4).required(),
    }),
};

module.exports = validators;
