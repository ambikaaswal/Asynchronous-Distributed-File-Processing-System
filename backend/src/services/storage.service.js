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

const deleteTemp = async(filepath)=>{
        try{
            await fs.unlink(filepath);
        }catch(err){
            if(err.code !== "ENOENT") {
            throw new AppError(500, "Server failed to delete");
            }
        }
        
        
    
};

const finalize = async(sourcepath,filename)=>{
        try{
            const dest = path.join(__dirname, "../../storage/processed",filename);
            await fs.rename(sourcepath, dest);
            return {
                filename,
                path: dest
            }
        }catch(err){
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
        console.log(filepath);
        return filepath;
    }catch(err){
        throw new AppError(404, "File doesn't exist");
    }
    
};



module.exports = {deleteTemp,finalize,list, get};