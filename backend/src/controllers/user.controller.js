const userModel = require("../models/user.model");


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



async function registerUser(req,res){
    const {name,email,password} = req.body;

    const existUser = await userModel.findOne({email});

    if (existUser){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)

    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    res.cookie("user-token", token)

    res.status(201).json({
        message: "user registered successfully",
        user:{
            name:user.name,
            email : user.email,
            _id: user._id
            
            
        }
    })


}

async function loginUser(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
},process.env.JWT_SECRET)


    res.cookie("user-token", token)

    res.status(201).json({
        message: "user logged in successfully",
        user:{
            name:user.name,
            email : user.email,
            _id: user._id
            
            
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}