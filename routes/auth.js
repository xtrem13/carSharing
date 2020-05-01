var express = require('express');
var router = express.Router();
var db=require('../models');


/* GET home page. */
router.post('/signin',async function(req, res, next) {
  var Drivers=db.Driver;
  var Driver=await Drivers.findOne(
  	{
  		where:
  			{
  				'licenceNum':req.body.licenceNum
  			}
  	}
  )
  console.log(Driver.password);
  if(Driver.password==req.body.password){
  	res.send({auth:true});
  }else{
  	res.send({auth:false});
  }

  
});

router.post('/signup', async function(req, res, next) {
  var Driver=db.Driver;
  var last= await Driver.max("driverId");
  await Driver.create({
  	driverId:(last+1),
  	firstName:req.body.firstName,
  	lastName:req.body.lastName,
  	phone:req.body.phone,
  	licenceNum:req.body.licenceNum,
  	password:req.body.password,
  	birth_date:req.body.birth_date,
  	drivingExperience:req.body.drivingExperience,
  	gender:req.body.gender,
  })
  .then(()=>{
  	
  	res.send({
  		success:true
  	})
  	
  }	
  )
  .catch(()=>{
  	
  	 res.send({
  		success:false
  	})
  }
  )
 
 
});

module.exports = router;
