var express = require('express');
const formidable = require('formidable');
const fs =require("fs")
var router = express.Router();

var tenpath='';
router.post('/', function(req, res, next) {
   const form = formidable({ multiples: true, uploadDir:"./public/Records",keepExtensions:true });
  //  let tenpath='';
    form.parse(req, (err, fields, files) => {
     if(err){
      console.log("false");
     }
    // tenpath=files.file.path;
    console.log(files.file.path)
    tenpath=files.file.path;
    // console.log('fields:', fields);
    // console.log('files:', files);
    fs.rename(files.file.path,files.file.path+'.m4a', function (err) {
      if (err) {
          console.log(err);
      }})
  });
  // console.log("path: ",tenpath);
  // res.sendFile(tenpath, function (err) {
  //   if (err) {
  //     console.log(err)
  //     next(err)
  //   } else {
  //     console.log('Sent:', fileName)
  //   }
  // })
   res.status(201).json("server co tra ve gia tri");
  
});
router.get('/down', function(req, res, next) {
   res.download(tenpath+".m4a");
  // res.download("public/Records/upload_4791f796eaa1138bbba928466cf0466b.mp3");
})

module.exports = router;
