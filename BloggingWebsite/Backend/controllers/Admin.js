import UserModel from "../models/user.js"


const GetUser =async(req,res)=>{
    try{
        const users = await UserModel.find()
        res.status(200).json({users})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}

const deleteUser =async(req,res)=>{
    try{
        const userId = req.params.id 

        const checkAdmin = await UserModel.findById(userId)
        if(checkAdmin.role == 'admin'){
            return res.status(400).json({message:"you can not delete yourself"})
        }
        const user = await UserModel.findByIdAndDelete(userId)
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Cannot find user to be deleted",
            });
        }
        res.status(200).json({message:"User deleted successfully",user})
        }catch(error){
        res.status(500).json({message:"Internal server error"})
        console.log(error)
    }
}


export default {GetUser,deleteUser};