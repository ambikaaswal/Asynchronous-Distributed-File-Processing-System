// Browser
// ↓
// Express
// ↓
// Request (Readable Stream)
// ↓
// Busboy
// ↓
// file (Readable Stream)
// ↓
// createWriteStream()
// ↓
// storage/temp/
// ↓
// Validation
// ↓
// Processing Manager

Algorithm:
// Busboy finds a file
//         │
//         ▼
// Increase activeWrites
//         │
//         ▼
// Start writing file
//         │
//         ▼
// Writing finishes
//         │
//         ▼
// Decrease activeWrites
//         │
//         ▼
// If parsing has finished
// AND
// No active writes remain
//         │
//         ▼
// Call next()

//types of errors:
//writestream errors, file errors, parser errors

const fs = require("fs");
const fsp = require("fs/promises"); //promises for fsp.unlink
const crypto =require("crypto");
const path = require("path");

const Busboy = require("busboy");
const AppError = require("../errors/AppError");
const { error } = require("console");
const busboyhandler = (req,res,next)=>{
 
    const jobDone = ()=>{
        if(parsingFinished && activewrites===0){         
                next();
            }
    }
    

    const parser = Busboy({headers: req.headers});
    //req.file multer deta h hume, but yaha hume bnaana h for multiple files
    req.files = [];
    req.failedFiles = [];
    //listening to file 
    let activewrites=0;
    let parsingFinished = false;
    
    parser.on("file", (fieldname, file, info)=>{
        // console.log(info);
        //to tell if this particular file has finished processing
        let completed = false;
        activewrites++;
        // const {filename, encoding, mimeType} = info; 
        //removing encoding since not using
        const {filename,  mimeType} = info;
        const extension = path.extname(filename);
        const newFileName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
        const destination = path.join(__dirname, `../../storage/temp/${newFileName}`);

        const complete = ()=>{
        if(completed) return true;
            completed=true;
            activewrites--;
        return false;
        }

        //now writing this file to writestream:
        const writeStream = fs.createWriteStream(destination);
        //error handling for writestream before connecting both streams
        writeStream.on("error",async(err)=>{
            //if error runs then finish won't for the current write
            if(complete()) return;
            
            req.failedFiles.push({
                error: err.message,
                originalname: filename,
                mimeType,   
            });
            try{
                await fsp.unlink(destination);
            }catch{
                //ignore for now
            }
            jobDone();
            // new AppError("500","disk full/server error");
        })

        writeStream.on("finish", ()=>{
            // check whether this particular file processing was complete earlier
            if(complete()) return;

            req.files.push({
                filename:newFileName,
                originalname: filename,
                mimetype:mimeType,
                path: destination
                });
            jobDone();
        });

        file.on("error", (err)=>{
            if(complete()) return;
            req.failedFiles.push({
                originalname: filename,
                error: err.message,
                mimeType
            });
            jobDone();
        })
        file.pipe(writeStream);
    });

    parser.on("finish", ()=>{
        console.log("Finished reading request");
        parsingFinished = true;
        jobDone();
    });
    
    //error handling for parser before connecting req and parser streams
    parser.on("error", (err)=>{
        next(new AppError("500", err.message));
    });
    //connecting re and parser streams
    req.pipe(parser);
}

module.exports = busboyhandler;