var express = require('express');
var router = express.Router();
var db=require('../models');


/* GET home page. */
router.post('/create',async function(req, res, next) {
  var Route=db.Route;
  var last= await Route.max("routeId");
  req.body.routeId=(last+1);
  
  db.Route.create(
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
  
  db.Route.findAll({where:{driverId:req.body.driverId}})
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
  
  db.Route.update(req.body.values, {where:{RouteNumber:req.body.RouteNumber}})
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
  
 db.Route.destroy({where:{routeId:req.body.RouteNumber}})
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
