var express = require('express');
var router = express.Router();
let location = require('../models/location')
const moment = require('moment');

router.post('/location',async (req,res) =>{
  let {Kids,day}= req.body;
  console.log("dayabc: ",day)
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



module.exports = router;
