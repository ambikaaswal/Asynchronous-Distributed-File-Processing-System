//receives request and sends response

const storageService = require("../services/storage.service");

const uploadFile = async(req,res)=>{

    try{

    const metadata = await storageService.finalize(req.file.path, req.file.filename);

    return res.status(201).json({
        success: true,
        file: {
            originalName: req.file.originalname,
            ...metadata
        }
    });
    }catch(err){
        return res.status(500).json({
            success: false,
            error: "Failed to upload file"
        });
    }
};
const downloadFile = (req,res)=>{
    const filepath = storageService.get(req.params.filename);
    res.download(filepath);
};

const listFiles = async(req,res)=>{
    const files = await storageService.list();
    return res.json({
        success: true,
        files
    })
};



module.exports = {uploadFile, downloadFile, listFiles};