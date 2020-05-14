var express = require("express");
var router = express.Router();
let User = require('../models/user')
let passport = require('passport')
let jwt = require('jsonwebtoken')

const JWTSecret = 'jwt-secret'

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/*router.post("/signup", async function (req, res, next) {
    //console.log(req.body);
    //! front-end send a unity
    const username = req.body.username;
    //hash-password

    let password = req.body.password;
    const hash = bcrypt.hashSync(password, 8);
    password = hash;

    //
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const role = req.body.role;
    const newuser = {
        username,
        password,
        firstname,
        lastname,
        role,
    };

    const result = await User.create(newuser, "user");
    //console.log("Result ", result);
    const ret = {
        id: result.id,
        ...req.body,
    };
    delete ret.password;
    // if (result.status === 400) res.status(result.status).send(result.err);
    // res.status(result.status).send(result.msg);
    console.log(ret);

    res.status(201).json(ret);
});*/

router.post('/signup', async function (req,res,next){
  passport.authenticate('signup', (err, user, info)=>{
    console.log(err, user, info)
    if(err) return res.status(400).json(err)
    if(info!=undefined){
       return res.json(info.message)
    }else{
      req.logIn(user, async(err)=>{
        console.log(user)
        let logInUser = await User.find(`username = '${user.username}'`)
        let newuser = {
          username: req.body.username,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          role: req.body.role
        }
        await User.update(newuser, logInUser.username)
        return res.status(200).json('User created')
        })
    }
  })(req,res)
  
  /*try{
    let newuser = {
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role
    }
    let result = await User.create(newuser)
    res.status(200).json("Sign up success")
  }catch{
    res.status(400).json("Sign up error")
  }*/
})

router.get('/signin', async function (req,res,next){
  try{
  passport.authenticate('signin',(err,user,info)=>{
    if(err) return res.status(400).json(err)
    if(info != undefined){
      return res.json(info.message)
    }else{
      req.logIn(user, async(err)=>{
        if(err) return res.status(400).json(err)
        let log = await User.find(`username = '${user.username}'`)
        if(log){
          const token = jwt.sign({id: user.username}, JWTSecret)
          res.status(200).json({auth: true, token:token, message: 'User found and logged in'})
    }})
    }
  }
)(req,res)
}catch(err){
  res.json(err)
}

  /*let condition = `username = '${req.body.username}' && password = '${req.body.password}'`
  try{
    await User.find(condition)
    res.status(200).json("Sign in success")
  }catch{
    res.status(400).json("Sign in error")
  }*/
})

module.exports = router;
