'use strict';
const stationModel = require("../models/station");
const conncetionModel = require("../models/connection");

const reactionBumb = require('../utils/reactionB');

const station_list_get = async (req, res) => {
  try {
    const topRight= req.query.topRight;
    const bottomLeft= req.query.bottomLeft;
    let start = 0;
    if(req.query.start) start = +req.query.start;
    let limit = 10;
    if(req.query.limit) start = +req.query.limit;
    let stations =[];

if (topRight && bottomLeft){
  const MapBound = reactionBumb(JSON.parse(topRight),
  JSON.parse(bottomLeft));
  stations = await stationModel.find(({
    Location:{
      $geoWithin:{
        $grometry:MapBound,
      },
    },
  })).populate({
    path:'Connections',
    populate:[
      {path:'ConnectionTypeID'},
      {path:'CurrentTypeID'},
      {path:'LevelID'},
    ],
  });
}else{
  stations = await stationModel.find().skip(start).limit(limit).populate({
    path:'Connections',
    populate:[
      {path:'ConnectionTypeID'},
      {path:'CurrentTypeID'},
      {path:'LevelID'},
    ],
  });
}
console.log(stations.length);
res.json(stations);
  }
  catch (e){
    res.status(500).json({message: e.message});
  }
  };

  const station_get = async (req, res) => {
    const station = await stationModel.findById(req.params.id).populate({
        path: "Connections",
        populate: [
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
        ]
    });
    res.send(station);
};
   
  const station_post = async (req, res) => {
    console.log('station_post', req.body);
    const connections = req.body.Connections;
    const newConnections = await Promise.all(connections.map(async conn => {
      let newConnection = new connectionModel(conn);
      const result = await newConnection.save();
      return result._id;
    }));

    const station = req.body.Station;
    station.Connections = newConnections; 
    
    let newStation = new stationModel (station);
    const rslt = newStation.save();
    res.json(rslt);
      };


  
    
    const station_put = async (req, res) => {
        const put = await stationModel.updateOne(req.body);
        res.status(200).send(`Station with id ${req.body._id} was updated`);
    };
    
    const station_delete = async (req, res) => {
        const del = await stationModel.deleteOne({_id: req.params.id});
        res.status(200).send(`Station with id ${req.params.id} was deleted`);
    }
    
    module.exports = {
        station_list_get,
        station_get,
        station_post,
        station_put,
        station_delete
    };