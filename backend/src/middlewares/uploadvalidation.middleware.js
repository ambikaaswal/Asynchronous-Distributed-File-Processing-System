
const AppError = require("../errors/AppError");
const storageService = require("../services/storage.service");

// async function deleteFile(filepath){
//     //find file and delete:
//     await storageService.deleteTemp(filepath);
// }

const uploadValidation = async(req, res, next)=>{
    //multer gives req.file and its properties
    if(!req.file){
   
        return next(new AppError(400, "File not found"));
    }
    if(req.file.size === 0){
        //find file from storage and delete
        await storageService.deleteTemp(req.file.path);
        return next( new AppError(400, "Empty file"));
    }

    //wrong MIME type or extension not allowed:
    const allowedmime = ["image/jpeg", "image/png", "application/pdf", "text/plain", "text/csv", "video/mp4","video/webm","video/ogg"]
    const allowedextensions = [".jpg", ".jpeg", ".png", ".mp4", ".csv", ".txt", ".pdf"];

    const validMime = allowedmime.includes(req.file.mimetype);
    const validExtension = allowedextensions.some(ext => req.file.originalname.toLowerCase().endsWith(ext));

    if(!validMime || !validExtension){
        await storageService.deleteTemp(req.file.path);
        return next(new AppError(400, " Invalid file type"));
    }

    next();

};

module.exports = uploadValidation;