
const storageService = require("../services/storage.service");

async function deleteFile(filepath){
    //find file and delete:
    await storageService.deleteTemp(filepath);
}

const uploadValidation = async(req, res, next)=>{
    try{
    if(!req.file){
       return res.status(400).json({
            error: "File not found",
            success: false
        });
    }
    if(req.file.size === 0){
        //find file from storage and delete
        await deleteFile(req.file.path);

        return res.status(400).json({
            error: "Empty File ",
            success:false
        })
    }

    //wrong MIME type or extension not allowed:
    const allowedmime = ["image/jpeg", "image/png", "application/pdf", "text/plain", "text/csv", "video/mp4","video/webm","video/ogg"]
    const allowedextensions = [".jpg", ".jpeg", ".png", ".mp4", ".csv", ".txt", ".pdf"];

    const validMime = allowedmime.includes(req.file.mimetype);
    const validExtension = allowedextensions.some(ext => req.file.originalname.toLowerCase().endsWith(ext));

    if(!validMime || !validExtension){
        await deleteFile(req.file.path);
        return res.status(400).json({
            error: "File type not valid",
            success: false
        })
    }

    next();
}catch(err){
    next(err);
}

};

module.exports = uploadValidation;