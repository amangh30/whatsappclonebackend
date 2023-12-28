import conversation from "../models/Conversation.js";

export const newConversation = async(req,res)=>{
    try{
        const senderId = req.body.senderId;
        const recieverId = req.body.recieverId;
        const exist = await conversation.find({members:{$all:[senderId,recieverId]}});
        if(exist.length){
            return res.status(200).json('Conversation already exist')
        }
        const newConversation = new conversation({
            members:[senderId,recieverId]
        })
        await newConversation.save();
        return res.status(200).json('Conversation saved successfully')
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}

export const getConversation = async(req,res)=>{
    try{
        const senderId = req.body.senderId;
        const recieverId = req.body.recieverId;
        let con = await conversation.findOne({members:{$all:[senderId,recieverId]}})
        return res.status(200).json(con)
    }
    catch(error)
    {
        return res.status(500).json(error.message)
    }
}