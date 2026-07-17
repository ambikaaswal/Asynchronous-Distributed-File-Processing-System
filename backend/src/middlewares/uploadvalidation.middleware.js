
const AppError = require("../errors/AppError");
const storageService = require("../services/storage.service");
const logger = require("../utils/logger");

// async function deleteFile(filepath){
//     //find file and delete:
//     await storageService.deleteTemp(filepath);
// }

const uploadValidation = async(req, res, next)=>{
    
    //multer gives req.file and its properties
    if(!req.file){
        logger.error("No file received");
        return next(new AppError(400, "File not found"));
    }
    if(req.file.size === 0){
        //find file from storage and delete
        logger.error("empty file received");
        await storageService.deleteTemp(req.file.path);
        return next( new AppError(400, "Empty file"));
    }

    //wrong MIME type or extension not allowed:
    const allowedmime = ["image/jpeg", "image/png", "application/pdf", "text/plain", "text/csv", "video/mp4","video/webm","video/ogg"]
    const allowedextensions = [".jpg", ".jpeg", ".png", ".mp4", ".csv", ".txt", ".pdf"];

    const validMime = allowedmime.includes(req.file.mimetype);
    const validExtension = allowedextensions.some(ext => req.file.originalname.toLowerCase().endsWith(ext));

    if(!validMime || !validExtension){
        logger.error("Invalid file type received");
        await storageService.deleteTemp(req.file.path);
        return next(new AppError(400, " Invalid file type"));
    }
    next();

};

module.exports = uploadValidation;