//receives request and sends response like a receptionist
// here, if there are errors they need to be catched/handled


//basically 2.. = request succeeded
// 3.. = client should do something else(redirects)
// 4.. = unauthorized bad request
// 5.. = Server encountered error


const storageService = require("../services/storage.service");

const uploadFile = async(req,res,next)=>{
    
        const metadata = await storageService.finalize(req.file.path, req.file.filename);
        return res.status(201).json({
            success: true,
            data: {
                originalName: req.file.originalname,
                filename: metadata.filename
            }
        });
           
};

const downloadFile = async(req,res, next)=>{
    
    //req.params comes from url parameters
    //req.file and its req.file.path etc are provided by multer
    // console.log(req.params);
    const filepath = await storageService.get(req.params.filename);
    // console.log(req.params.filename);
    // console.log(filepath);
    // console.log(typeof filepath);

    return res.download(filepath);
    
};

const listFiles = async(req,res, next)=>{
        const files = await storageService.list();
        return res.json({
            success: true,
            data :{
                files
            }
        });
};



module.exports = {uploadFile, downloadFile, listFiles};