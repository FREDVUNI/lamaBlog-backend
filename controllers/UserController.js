export const getUsers = async(req,res) =>{
    try{
        res.send('working!!!')
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}

export const createUser = async(req,res) =>{
    try{
        res.send('working!!!')
    }
    catch(error){
        console.log(error.message || `There was a server error.`)
    }
}