const { setUser, emailExist, usernameExist, getUserByEmail} = require('../services/auth.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config()

const logoutUser = async(req, res) => {
    try{
        res.setCookie('jwt', '', {maxAge:0})
        return res.code(201).send({
            success: true
        });
    } catch (error) {
        return res.code(500).send({
            error,
            success: false
        });
    }
}

const registerUser = async (req, res) => {
    try {
        if(usernameExist(req.body.username)){
            return res.code(400).send({
                success: false,
                message: "username exist"
            });
        }
        if(emailExist(req.body.email)){
            return res.code(400).send({
                success: false,
                message: "email exist"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            first_name: req.body.first_name,
            user_id:req.body.username,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            last_name: req.body.last_name,
        };
        await setUser(user);
        return res.code(201).send({
            success: true
        });
    } catch (error) {
        return res.code(500).send({
            error,
            success: false
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await getUserByEmail(req.body.email);
        if(!user){
            return res.code(404).send({
                success: false,
                massage:"User not found",
            }); 
        }
        if( !await bcrypt.compare(req.body.password, user.password)){
            return res.code(400).send({
                success: false,
                massage:"Password is incorrect",
            });
        }
        
        const token = jwt.sign({id: user.user_id}, process.env.JWT_SECRET);

        res.setCookie('jwt', token, {
            httpOnly: true,
            maxAge: 24*60*1000
        })

        return res.send({
            success: true
        });
    } catch (e) {
        console.log(e);
        return res.code(500).send({
            error: e,
            success: false
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
