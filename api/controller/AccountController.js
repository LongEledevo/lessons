const AccountModel = require("../model/AccountModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.registerAccount = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usernameDB = await AccountModel.findOne({ username });
        if (usernameDB) {
            res.send({ message: "Account already exists!" });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const allUser = await AccountModel.find();
            let data;
            if (allUser.length !== 0) {
                data = await AccountModel.create({
                    username: username,
                    password: hash,
                    role: "user",
                });
            } else {
                data = await AccountModel.create({
                    username: username,
                    password: hash,
                    role: "admin",
                });
            }
            const userData = {
                username: data.username,
                role: data.role,
            };
            const accessToken = jwt.sign(userData, process.env.PRIVATE_KEY, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE,
            });
            res.send({
                message: "Registration success!",
                data: data,
                token: accessToken,
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginAccount = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username, password);
        const usernameDB = await AccountModel.findOne({ username });
        if (username === usernameDB.username) {
            await bcrypt.compare(password, usernameDB.password, (err, result) => {
                if (err) res.send(err);
                if (result) {
                    const userData = {
                        username: usernameDB.username,
                        role: usernameDB.role,
                    };
                    const accessToken = jwt.sign(userData, process.env.PRIVATE_KEY, {
                        algorithm: "HS256",
                        expiresIn: process.env.ACCESS_TOKEN_LIFE,
                    });
                    return res
                        .status(200)
                        .json({
                            message: "Login success",
                            username: usernameDB.username,
                            role: usernameDB.role,
                            token: accessToken,
                        });
                }
            });
        } else {
            res.send({ message: "Username doesn't exists!" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
