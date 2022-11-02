import { db } from "../connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import joi from "joi"

export const signup = (req,res) =>{  
    try{
        const schema = joi.object({
            username:joi.string().required().min(3).max(20),
            email:joi.string().required().min(10).max(20).email(),
            password:joi.string().required().min(10).max(40),
        }) 

        const {error} = schema.validate(req.body)
        if(error) return res.status(400).json(error.details[0].message)

        const q = "SELECT * FROM users WHERE email = ? AND username = ?"

        db.query(q,[req.body.email,req.body.username],(err,data)=>{
            if(err) return res.status(500).json(err)
            //check if user exists
            if(data.length) return res.status(409).json('user already exists.')

            //salt -- hash password
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(req.body.password,salt)

            const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
            const VALUES =[
                req.body.username,
                req.body.email,
                hash
            ]

            db.query(q,[VALUES],(err,data) =>{
                if(err) return res.status(409).json(err)

                return res.status(200).json("user has been created.")
            })

        })

    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}
 
export const login = async(req,res) =>{
    try{
        const schema = joi.object({
            username:joi.string().required(),
            password:joi.string().required(),
        })

        const {error} = schema.validate(req.body)
        if(error) return res.status(400).json(error.details[0].message)
        
        const q = "SELECT * FROM users WHERE username = ?"

        db.query(q,[req.body.username],(err,data)=>{
            if(err) return res.status(500).json(err)
            if(data.length === 0) return res.status(409).json('wrong username password combination.')

            let passwordCheck = bcrypt.compareSync(req.body.password,data[0].password)
            if(!passwordCheck) return res.status(409).json('wrong username password combination.')

            //not get password in token
            const {password, ...other} = data[0]

            const token = jwt.sign({
                id:data[0].id,
                other
            },process.env.SECRET_KEY)

            res.cookie("accessToken",token,{
                httpOnly:true                
            }).status(200).json(data[0])
        })
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}

export const logout = async(req,res) =>{
    try{
        res.clearCookie("accessToken",{
            sameSite:"none",
            secure:true
        }).status(200).json("You have been logged out")
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}