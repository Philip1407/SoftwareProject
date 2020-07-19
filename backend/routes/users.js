var express = require('express');
var router = express.Router();
let location = require('../models/location');
let dangerousmodel = require('../models/dangerous')
const moment = require('moment');

router.post('/location',async (req,res) =>{
  let {Kids,day}= req.body;
  let start,end;
  if(day==1){
    start = moment().startOf('day'); // set to 12:00 am today
    end = moment().endOf('day'); // set to 23:59 pm today
   
  }else{
    start = moment().subtract(day-1, "days").startOf('day'); // set to 12:00 am today
    end = moment().subtract(day-1, "days").endOf('day'); // set to 23:59 pm today
    
  }
  let result = await location.find({ 'Kids': Kids,'timestamp':{$gte:start, $lt:end}});
  if (result == null) {
    return res.json({ status: false });
  }

  res.json({
    location:result
  })
})

router.post('/dangerous',async (req,res) =>{
  let {poi,_id}= req.body;
  console.log("poi: ",poi)
  // console.log("_id: ",_id)
  let denger ={
    name:poi.name,
    ...poi.coordinate,
    
  }
  let result = await dangerousmodel.insertMany({...denger,Idparent:_id})
  res.json(result)
})

router.get('/dangerous/:id',async (req,res) =>{
  let _id=  req.params.id
  console.log("_id: ",_id)
  let result = await dangerousmodel.find({"Idparent":_id})
  console.log("result: ",result)
  res.json(result)
})

module.exports = router;
