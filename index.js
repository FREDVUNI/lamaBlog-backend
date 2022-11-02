import app from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./database.js"

dotenv.config({path:".env"})
const PORT = process.env.PORT || 8000

connectDB()
app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})