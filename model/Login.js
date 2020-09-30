const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");

function Login(login) {
    this.username = login.username;
    this.password = login.password;
}

Login.prototype.validateLogin = function(login) {

    const schema = Joi.object({
        username: Joi.string() .min(6) .required(),
        password: Joi.string() .min(6) .required() 
    });

    
    return schema.validate(login);
};

Login.prototype.generateAuthToken = function(login) {
    const token = jwt.sign(
        {
            _id: login.id,
            _username: login.username
        },
        config.get('jwtPrivateKey'),
        {
            expiresIn: config.get('expireIn')
        }
    );

    
    return token;
};

module.exports = Login;