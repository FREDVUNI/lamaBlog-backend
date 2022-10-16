import { db } from "../connection.js"
import joi from 'joi'
import jwt from 'jsonwebtoken'

export const getPosts = async(req,res) =>{
    try{
        const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"
        db.query(q,[req.query.cat],(err,data) =>{
            if(err) return res.status(500).json(err)

            res.status(200).json(data)
        })

    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}

export const getPost = async(req,res) =>{
    try{
        const postId = Number(req.params.id)

        const q = "SELECT p.id,`username`,`title`,`desc`,`cat`,`uid`,p.img,u.img AS userImg,p.date_created FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?"

        db.query(q,[postId],(err,data) =>{
            if(err) return res.status(500).json(err)

            if(postId){
                res.status(200).json(data[0])
            }else{
                res.status(404).json("The post wasnot found.")
            }
            
        })
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}

export const addPost = async(req,res) =>{
    try{
        const schema = joi.object({
            title:joi.string().required().min(5).max(200),
            desc:joi.string().required().min(5).max(2000),
            img:joi.string(),
            cat:joi.string().required(),
        })
        const { error } = schema.validate(req.body)
        if(error) return res.status(400).json(error.details[0].message)
        

        const token = req.cookies.accessToken
        if(!token) return res.status(401).json(`You're not authorized.`)

        jwt.verify(token,process.env.SECRET_KEY,(err,userInfo) =>{
            if(err) return res.status(403).json(`You're not authorized.`)
            const q = "INSERT INTO posts(`title`,`desc`,`img`,`cat`,`uid`) VALUES(?)"

            const VALUES =[
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
                userInfo.id,
            ]

            db.query(q,[VALUES],(err,data)=>{
                res.status(200).json("Post has been added.")
            })

        })
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}

export const deletePost = async(req,res) =>{
    try{
        const postId = Number(req.params.id)

        const token = req.cookies.accessToken
        if(!token) return res.status(401).json(`You're not authorized.`)

        jwt.verify(token,process.env.SECRET_KEY,(err,userInfo) =>{
            if(err) return res.status(403).json(`You're not authorized.`)
            const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

            db.query(q,[postId,userInfo.id],(err,data) =>{
            if(err) return res.status(403).json(`You're not authorized.`)

            if(postId){
                res.status(200).json("Post has been deleted.")
            }else{
                res.status(404).json("The post wasnot found.")
            }
        })

        })

    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}

export const updatePost = async(req,res) =>{
    try{
         const schema = joi.object({
            title:joi.string().required().min(5).max(200),
            desc:joi.string().required().min(5).max(2000),
            img:joi.string(),
            cat:joi.string().required(),
        })

        const { error } = schema.validate(req.body)
        if(error) return res.status(400).json(error.details[0].message)

        const postId = Number(req.params.id)

        const token = req.cookies.accessToken
        if(!token) return res.status(401).json(`You're not authorized.`)

        jwt.verify(token,process.env.SECRET_KEY,(err,userInfo) =>{
            if(err) return res.status(403).json(`You're not authorized.`)
            const q = "UPDATE posts SET `title` = ?,`desc` = ?,`img` = ?,`cat` = ?  WHERE `id` = ? AND `uid` = ?"

            const VALUES =[
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.cat,
            ]

            db.query(q,[...VALUES,postId,userInfo.id],(err,data) =>{
            if(err) return res.status(403).json(`You're not authorized.`)

            if(postId){
                res.status(200).json("Post has been updated.")
            }else{
                res.status(404).json("The post wasnot found.")
            }
        })

        })
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}