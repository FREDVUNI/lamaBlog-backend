import express from "express"
const router = express.Router()
import {getUsers,createUser} from "../controllers/UserController.js"

router.get("/users",getUsers)
router.post("/users",createUser)

export default router