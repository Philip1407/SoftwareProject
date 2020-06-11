var express = require('express');
var router = express.Router();
let User = require('../models/user')
let passport = require('passport')
let jwt = require('jsonwebtoken')
const JWTSecret = 'jwt-secret'

router.get('/',(req,res)=>{
  res.json("User authorize")
})

router.post('/location',(req,res) =>{
  User.findOneAndUpdate({'username': req.body.username},{ "$push": { "path": req.body.location } }, (err,user)=>{
    if(err) return res.status(400).json(err)
      return res.status(200).json('Updated path')
  })
})

/*router.get('/signin', (req, res)=> {
  passport.authenticate('signin',(err,user,info)=>{
    console.log('pass authenticate')
    if(err) return res.status(400).json(err)
    if(info != undefined){
      return res.json(info.message)
    }else{
      req.logIn(user, err=>{
        if(err) return res.status(400).json(err)
        User.findOne({'username': user.username}, (err,logInUser)=>{
        if(logInUser){
          const token = jwt.sign({id: user.username}, JWTSecret)
          res.status(200).json({auth: true, token:token, message: 'User found and logged in'})
    }})})
    }
  }
)(req,res)
})


router.post('/signup', (req,res, next )=>{
  passport.authenticate('signup',(err,user,info)=>{
    if(err) return res.status(400).json(err)
    if(info!=undefined){
       return res.json(info.message)
    }else{
      req.logIn(user, (err)=>{
        console.log(user)
        if(err) return res.status(400).json(err)
        User.findOne({'username':user.username},(err,logInUser)=>{
          console.log(logInUser)
          let newuser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role
          }
          User.findOneAndUpdate({'username': logInUser.username},newuser,err=>{
            if(err) return res.status(400).json(err)
            return res.status(200).json('User created')
          })
        })
      })
    }
  })(req,res)
})*/

module.exports = router;
