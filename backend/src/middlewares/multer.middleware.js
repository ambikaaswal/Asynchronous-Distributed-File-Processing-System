
//Notes about middleware:

// req = created by Node.js (http.IncomingMessage)
// res = created by Node.js (http.ServerResponse)
// Extra methods like req.body, res.json = created by Express (by decorating the Node objects)
// next =  by  Express (created for each middleware chain)

// const logger = ((req, res, next)=>{
//     console.log("Logger...incoming request");
//     //without next this function ends and there is no res.send or res.json
//     // because the next router or whatever registered next, won't execute as well and request hangs, since
//     //connection is neither closed nor response is send
//     next();
// })

// module.exports = logger;

//Work:
//using multer parsing here:
// converts multipart/form-data into req.file
//saves data in storage/temp 

const multer = require("multer");
const path = require("path");

//destination for multer:
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, "../../storage/temp"))
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname); //will cause problem later i.e overwrite file
    }
});

//here validation is generic validation 
//later content validation is done while processing.

const upload = multer({
    storage
});

module.exports = upload;
