var express = require('express');
var router = express.Router();
var db=require('../models');


/* GET home page. */
router.post('/create',async function(req, res, next) {
  db.Car.create(
    req.body
  )
  .then(()=>{
    res.send({
      success:true
    })
  })
  .catch((err)=>{
    console.log(err);
    res.send({
      "success":false
    })
  })
  
  
});

router.post('/read', async function(req, res, next) {
  
  db.Car.findAll({where:{driverId:req.body.driverId}})
  .then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    console.log(err);
    res.send({
      success:false
    });
  })
 
});

router.post('/update', async function(req, res, next) {
  
  db.Car.update(req.body.values, {where:{carNumber:req.body.carNumber}})
  .then((data)=>{
    res.send({
      success:true
    });
  })
  .catch((err)=>{
    console.log(err);
    res.send({
      success:false
    });
  })
 
});

router.post('/delete', async function(req, res, next) {
  
 db.Car.destroy({where:{carNumber:req.body.carNumber}})
  .then((data)=>{
    res.send({
      success:true
    });
  })
  .catch((err)=>{
    console.log(err);
    res.send({
      success:false
    });
  })
 
});

module.exports = router;
