var express = require('express');
var router = express.Router();
var db=require('../models');
var distance=require("../helpers/distance");
var dayMatch=require("../helpers/dayMatch");
var timeMatch=require("../helpers/timeMatch");
var meanTime=require("../helpers/meanTime");
var averageGeolocation=require("../helpers/averageGeolocation");
const sequelize = require('sequelize');


/* GET home page. */
router.post('/match',async function(req, res, next) {
  var myroute=await db.Route.findOne({where:{routeId:req.body.routeId}});
  var routes=await db.Route.findAll({where:{
    routeId: {
      [sequelize.Op.not]: req.body.routeId
    }
  }})
  var matched=routes.filter(route=>{
    var start_d=distance(myroute.from_long,
                   myroute.from_alt,
                   route.from_long,
                   route.from_alt, 
                   true
                  )
    var finish_d=distance(myroute.to_long,
                   myroute.to_alt,
                   route.to_long,
                   route.to_alt, 
                   true
                  );
    var time=timeMatch(myroute.start_time, route.start_time);
    var days=dayMatch(myroute.days, route.days);
    return (start_d&&finish_d&&time&&days);
  })
  res.send(matched);
});
router.post('/gmatch',async function(req, res, next) {
  var myroute=await db.Route.findOne({where:{routeId:req.body.routeId}});
  var groups=await db.DriverGroup.findAll();
  var matched=groups.filter(route=>{
    var start_d=distance(myroute.from_long,
                   myroute.from_alt,
                   route.common_start_longtitude,
                   route.common_start_altitude, 
                   true
                  )
    var finish_d=distance(myroute.to_long,
                   myroute.to_alt,
                   route.common_finish_longtitude,
                   route.common_finish_altitude, 
                   true
                  );
    var time=timeMatch(myroute.start_time, route.common_start_time);
    var days=dayMatch(myroute.days, route.days);
    return (start_d&&finish_d&&time&&days);
  })
  res.send(matched);
});

router.post('/form',async function(req, res, next) {
  var route1=await db.Route.findOne({where:{routeId:req.body.FirstRoute}});
  var route2=await db.Route.findOne({where:{routeId:req.body.SecondRoute}});
  var cords=[
              {
                longitude:route1.from_long,
                latitude:route1.from_alt
              },
              {
                longitude:route2.from_long,
                latitude:route2.from_alt
              }
    ]
  var commonStart=averageGeolocation(cords);
  var commonFinish=averageGeolocation([{
      longitude:route1.to_long,
      latitude:route1.to_alt
    },
    {
      longitude:route2.to_long,
      latitude:route2.to_alt
    }]
  )
  var gId=await db.DriverGroup.max("groupId");
  var common_start_longtitude=commonStart.longitude;
  var common_start_altitude=commonStart.latitude;
  var common_finish_longtitude=commonFinish.longitude;
  var common_finish_altitude=commonFinish.latitude;
  var d=distance(common_start_longtitude,
                common_finish_altitude,
                common_finish_longtitude,
                common_finish_altitude,
                false
    );
  var meanT=meanTime(route1.start_time, route2.start_time);
  db.DriverGroup.create({
    groupId:(gId+1 ),
    common_start_longtitude: common_start_longtitude,
    common_start_altitude: common_start_altitude,
    roadLength:d ,
    days:route1.days,
    common_finish_longtitude: common_finish_longtitude,
    common_finish_altitude:common_finish_altitude ,
    common_start_time: meanT
  })
  .then(()=>{
    db.Route.update({groupId:(gId+1)},{where:{
      routeId:route1.routeId
    }})
    .then(()=>{
      db.Route.update({groupId:(gId+1)},{where:{
        routeId:route2.routeId
      }})
      .then(()=>{
        res.send({
          success:true
        })
      })
      .catch(err=>{
        console.log(err);
        res.send({
          success:false
        })
      })
    })
    .catch(err=>{
      console.log(err);
        res.send({
          success:false
        })
      })
     
    
  })
  .catch((err)=>{
    console.log(err);
    res.send({
      success:false
    })
  })

});
router.post('/join',async function(req, res, next) {
  var route=await db.Route.findOne({where:{routeId:req.body.route}});
  var group=await db.DriverGroup.findOne({where:{groupId:req.body.group}});


  var commonStart=averageGeolocation([
              {
                longitude:route.from_long,
                latitude:route.from_alt
              },
              {
                longitude:group.common_start_longtitude,
                latitude:group.common_start_altitude
              }
    ]
  );
  var commonFinish=averageGeolocation([{
      longitude:route.to_long,
      latitude:route.to_alt
    },
    {
      longitude:group.common_finish_longtitude,
      latitude:group.common_finish_altitude
    }]
  );
  var common_start_longtitude=commonStart.longitude;
  var common_start_altitude=commonStart.latitude;
  var common_finish_longtitude=commonFinish.longitude;
  var common_finish_altitude=commonFinish.latitude;
  var d=distance(common_start_longtitude,
                common_finish_altitude,
                common_finish_longtitude,
                common_finish_altitude,
                false
    );

  var meanT=meanTime(route.start_time, group.common_start_time);
  try{
  await db.DriverGroup.update({
      common_start_longtitude: common_start_longtitude,
      common_start_altitude: common_start_altitude,
      roadLength:d ,
      days:route.days,
      common_finish_longtitude: common_finish_longtitude,
      common_finish_altitude:common_finish_altitude ,
      common_start_time: meanT
    },{where:{
      groupId:group.groupId
    }}
    )
  }catch(err){
    console.log(err);
    res.send({success:false});
    return
  }
  try{
    await db.Route.update({groupId:group.groupId},{where:{
      routeId:route.routeId
    }});
    
  }catch(err){
    console.log(err);
    res.send({success:false});
    return
  }
  res.send({success:true})    
 
});
module.exports = router;