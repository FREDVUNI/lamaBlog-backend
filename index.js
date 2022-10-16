import express from "express"
const app = express()
import morgan from "morgan"
import dotenv from "dotenv"
import cors from "cors"
import PostRouter from "./routes/posts.js"
import UserRouter from "./routes/users.js"
import AuthRouter from "./routes/auth.js"
import { connectDB } from "./database.js"
import cookieParser from "cookie-parser"
import multer from "multer"
import path from "path"

app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({extended:"true"}))

app.use(cors())
app.use(cookieParser())

dotenv.config({path:".env"})
const PORT = process.env.PORT || 8000

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{ 
        cb(null,"../client/public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))  
    }
    
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage,fileFilter })

app.use("/api/upload",upload.single("file"),(req,res) =>{
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api",PostRouter)
app.use("/api",UserRouter)
app.use("/api",AuthRouter)

connectDB()
app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})