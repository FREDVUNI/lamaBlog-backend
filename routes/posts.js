import express from "express"
const router = express.Router()
import {getPosts,getPost,addPost,deletePost,updatePost} from "../controllers/PostController.js"

router.get("/posts",getPosts)
router.get("/posts/:id",getPost)
router.post("/posts",addPost)
router.delete("/posts/:id",deletePost)
router.put("/posts/:id",updatePost)

export default router