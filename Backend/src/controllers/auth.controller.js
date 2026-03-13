const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerController(req, res) {
    const {username, email, password} = req.body
    
    const isAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isAlreadyExists){
        return res.status(400).json({
            message:"User with this email or username already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    }, 
    process.env.JWT_SECRET,
    {
        expiresIn:'1d'
    })

    res.cookie("token", token);

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
}


async function loginController(req, res) {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials."
        })
    }

    const isPassValid = await bcrypt.compare(password, user.password)

    if(!isPassValid){
        return res.status(400).json({
            message:"Invalid Credentials."
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    }, 
    process.env.JWT_SECRET,
    {
        expiresIn:'1d'
    })

    res.cookie("token", token);

    res.status(201).json({
        message:"User login successful",
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
}




module.exports = {
    registerController,
    loginController
}