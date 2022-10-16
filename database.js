import { db } from "./connection.js"

export const connectDB = async()=>{
try{
    await db.connect(error=>{ 
       if(error){
            throw error
        }
        console.log(`connected to database`) 
    })
}
catch(error){
    console.log(error)
    }
}