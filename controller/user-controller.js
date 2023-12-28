import user from "../models/User.js"

export const addUser = async (req,res)=>{
    try{
        let exist = await user.findOne({sub: req.body.sub});
        if(exist){
            res.status(200).json({
                msg:'User already exist'
            });
            return;
        }
        const newUser = new user(req.body)
        await newUser.save();
        return res.status(200).json(newUser);
    }
    catch(error){
        res.status(500).json(error.message)
    }
}

export const getUser = async(req,res)=>{
    try{
        const users = await user.find({})
        return res.status(200).json(users)
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}