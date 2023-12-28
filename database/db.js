import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD


const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@project.cp3qbxz.mongodb.net/?retryWrites=true&w=majority`

const Connection = async ()=>  {
    try{
        
            await mongoose.connect(URL,{useUnifiedTopology:true});
            console.log('Database connected successfully');
    } catch(error){
        console.log("Error connecting to database",error.messsage)
    }
}

export default Connection;