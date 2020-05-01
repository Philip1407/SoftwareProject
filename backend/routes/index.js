var express = require('express');
var router = express.Router();
let User = require('../models/user')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function (req,res,next){
  console.log(req.body)
  let newuser = [
    req.body.username,
    req.body.password,
    req.body.firstname,
    req.body.lastname,
    req.body.role
  ]
  let result = await User.create(newuser)
  console.log('Result ',result)
  if(result.status===400) res.status(result.status).send(result.err)
  res.status(result.status).send(result.msg)
})

router.get('/signin', async function (req,res,next){
  let result = await User.find(`username='${req.body.username}' && password='${req.body.password}'`)
  if(result.status===400) res.status(result.status).send(result.err)
  res.status(result.status).send(result.result)
})

module.exports = router;
