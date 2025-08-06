import UserModel from "../models/user.js";
import bcryptjs from 'bcryptjs';

const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const exitsUser = await UserModel.findOne({email});
        if(exitsUser){
            return res.status(401).json({success:false,message:"User already exists"})
        }
        const hassedpassword = await bcryptjs.hashSync(password,10)

        const newUser = new UserModel({
            name,email,password:hassedpassword
        })

        await newUser.save()
        res.status(200).json({message:"User register successfully",newUser})

    }catch(error){
        res.send(500).json({success:false,message:"Internal server error"});
        console.log(error);
    }
}
const login = async(req,res)=>{
    try{
        const {email,password} = req.body

        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({success:false,message:"Invalid credentials , register first"})
        }
        const ispasswordValid = await bcryptjs.compare(password,user.password)
        if(!ispasswordValid){
            return res.status(404).json({success:false,message:"Invalid password , register first"})
        }
        res.status(200).json({success:true,message:"Login successfully",user})
    }catch(error){
        res.send(500).json({success:false,message:"Internal server error"});
        console.log(error);
    }
}

export {register, login}