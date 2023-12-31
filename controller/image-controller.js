import grid from 'gridfs-stream'
import mongoose from "mongoose"

const url = "https://whatsappbackend-c1dv.onrender.com"

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});
export const uploadFile = async(req,res)=>{
    try{
    if(!req.file){
        return res.status(404).json("File not found");
    }
    const ImageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(ImageUrl);
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}
