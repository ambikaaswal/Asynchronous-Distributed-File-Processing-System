const express = require("express");
const authenticate = require("");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const validation = require("../middlewares/upload.validation");

const uploadController = require("../controllers/upload.controller");

//What does this do? : 1)validate 
//2)generate file name
//3)save to storage/temp
//4)return metadata

router.post('/upload',upload.single("file"), validation, uploadController.uploadFile);   

router.get('/download/:filename', uploadController.downloadFile);

router.get('/files', uploadController.listFiles);

module.exports = router;