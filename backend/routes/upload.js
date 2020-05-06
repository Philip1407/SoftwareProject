var express = require('express');
const formidable = require('formidable');
const fs =require("fs")
var router = express.Router();


router.post('/', function(req, res, next) {
   const form = formidable({ multiples: true, uploadDir:"./public/Records",keepExtensions:true });
   form.parse(req, (err, fields, files) => {
     if(err){
      console.log("false");
     }
    // console.log('fields:', fields);
   // console.log('files:', files);
    fs.rename(files.file.path,files.file.path+'.m4a')
  });
   res.status(201).json("server co tra ve gia tri");
});

module.exports = router;
