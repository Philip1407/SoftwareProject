var express = require('express');
var router = express.Router();
let User = require('../models/user')
let jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {
  // entity = {
  //   "username": "admin",
  //   "Password": "admin"
  // }
  // let result = req.body;
  let {username,password}= req.body;
  let result = await User.findOne({ 'username': username, "password": password });
  if (result == null) {
    return res.json({ status: false });
  }
  const accessToken = generateAccessToken(result._id);

  res.json({
    user:result,
    accessToken,
  })
})

router.post('/signup', async (req, res) => {
  let tempt = await User.findOne({ 'username': req.body.username });
  if(tempt!=null){
    return res.json({status:false})
  }
  let Phong = Math.floor(Math.random() * 100000) + 1;
    console.log(Phong);
  let data ={
    ... req.body,
    Kids: Phong.toString()
  }
  let result = await User.insertMany(data);

  res.json(result[0]);
})

const generateAccessToken = userId => {
  const payload = { userId };
  const accessToken = jwt.sign(payload, "findKids", {
    expiresIn: "1d"
  });

  return accessToken;
}


module.exports = router;
