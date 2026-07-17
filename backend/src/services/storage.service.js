//gnerate file name
//can save file
//list file
//read file
//update file
//delete file


// Storage Service for now
//since processed will be files that are completely processed

// ├── deleteTemp()
// ├── moveToProcessed()
// ├── listProcessed()
// └── readProcessed()

const fs = require("fs/promises");
const path = require("path");
const AppError = require("../errors/AppError");
const logger = require("../utils/logger");

const deleteTemp = async(filepath)=>{
        try{
            await fs.unlink(filepath);
        }catch(err){
            logger.error("failed to delete temporary file :",filepath);
            if(err.code !== "ENOENT") {
            throw new AppError(500, "Server failed to delete");
            }
        }
        
        
    
};

const finalize = async(sourcepath,filename)=>{
        try{
            const dest = path.join(__dirname, "../../storage/processed",filename);
            await fs.rename(sourcepath, dest);
            logger.log(filename, " uploaded");
            return {
                filename,
                path: dest
            }
        }catch(err){
            logger.error(filename, ": uploading failed")
            if(err instanceof AppError)
                throw err;
            throw new AppError(500, "Failed to upload file");
        }
        
};


const list = async()=>{
    try{
        const dir = path.join(__dirname, "../../storage/processed");
        const files = await fs.readdir(dir);
        return files;
    }catch(err){
        throw new AppError(500, "Server Error");
    }
};

const get = async(filename)=>{
    try{
        const filepath = path.join(__dirname, "../../storage/processed", filename);
        await fs.access(filepath); //throws if file doen't exist
        return filepath;
    }catch(err){
        logger.error("Unable to download: ", filename)
        throw new AppError(404, "File doesn't exist");
    }
    
};



module.exports = {deleteTemp,finalize,list, get};