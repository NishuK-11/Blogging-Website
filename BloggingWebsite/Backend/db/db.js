import mongoose from "mongoose";

const dbCon = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb connected successfully");
    }catch(error){
        console.log("problem in connection");
    }
}

export default dbCon