const Joi = require("joi");



function Register(body) {
    this.username = body.username
    this.email = body.email
    this.password = body.password
}

Register.prototype.validateRegister = function (register) {

    const schema = Joi.object({
        username: Joi.string() .min(6) .required(),
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() 
    });

    
    return schema.validate(register);
};

module.exports = Register