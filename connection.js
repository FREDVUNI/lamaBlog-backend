import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config({path:".env"})

export const db = mysql.createConnection({
    port:process.env.DATABASE_PORT,
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE,
    connectionLimit:10
})