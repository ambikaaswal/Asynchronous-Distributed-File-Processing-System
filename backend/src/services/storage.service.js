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

const deleteTemp = async(filepath)=>{
    try{
        await fs.unlink(filepath);
    }catch(err){
        if(err.code !== "ENOENT") {
            throw err;
        }
    }
};

const finalize = async(sourcepath,filename)=>{
        const dest = path.join(__dirname, "../../storage/processed",filename);
    try{
        await fs.rename(sourcepath, dest);
        return {
            filename,
            path: dest
        }
    }catch(err){
        throw err;     
    }
};


const list = async()=>{
    const dir = path.join(__dirname, "../../storage/processed");
    const files = await fs.readdir(dir);
    return files;
};

const get = (filename)=>{
    try{
        const filepath = path.join(__dirname, "../../storage/processed", filename);
        return filepath;
    }catch(err){
        throw err;
    }
};



module.exports = {deleteTemp,finalize,list, get};