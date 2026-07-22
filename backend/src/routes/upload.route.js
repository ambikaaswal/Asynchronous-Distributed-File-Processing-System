const express = require("express");
// const authenticate = require("");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler")
const upload = require("../middlewares/multer.middleware");
const validation = require("../middlewares/uploadvalidation.middleware");


const uploadController = require("../controllers/upload.controller");
const busboyupload = require("../middlewares/busboy.middleware");

//What does this do? : 1)validate 
//2)generate file name
//3)save to storage/temp
//4)return metadata

router('/upload/stream', busboyupload, asyncHandler(validation), asyncHandler(uploadController.uploadFile));

router.post('/upload',upload.single("file"), asyncHandler(validation), asyncHandler(uploadController.uploadFile));   

router.get('/download/:filename', asyncHandler(uploadController.downloadFile));

router.get('/files', asyncHandler(uploadController.listFiles));

module.exports = router;