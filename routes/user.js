const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
var Register = require("../model/Register");
var Login = require("../model/Login");

const AppDatabaseManager = require("../manager/appDatabaseManager");
const appDatabaseManager = new AppDatabaseManager();


router.post("/register", async (req, res) => {
    try {
        var register = new Register(req.body);
        const { err } = register.validateRegister(register);

        if(err) return res.status(400).send({ message: err.details[0].message});
        
        let userCheck = await appDatabaseManager.fetchUserByUsername(register.username);

        if(userCheck != 0 ) return res.status(400).send("User already registered");

        
        const salt = await bcrypt.genSalt(10);
        register.password = await bcrypt.hash(register.password, salt);

        
        let user = await appDatabaseManager.doRegister(register);
        res.status(200).send("Alles ok");
    } catch (error) {
        
        res.status(400).send(error);
    }

});

router.post("/login", async (req, res) => {
    try {
        var login = new Login(req.body);
        const { error } = login.validateLogin(login);

        if(error) return res.status(400).send({message: error.details[0].message});

        const userInfo = await appDatabaseManager.fetchUserByUsername(login.username);

        if(userInfo.login == 0) return res.status(400).send({message: "Invalid username or password"});

        const validPassword = await bcrypt.compare(login.password, userInfo[0].password);

        if(!validPassword) return res.status(400).send({message: "Invalid username or password"});

        res.status(200).send({ token: await login.generateAuthToken(login)});

    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;