var express = require('express');
var router = express.Router();
var tempdata_tb = require('../models/tempdata.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('tempdata', { title: 'Tempdata index' });
});
router.get('/getfrom/:time', function(req, res) {
  res.render('tempdata', { title: 'Tempdata index' , time : req.params.time});
});

router.get('/send/:temp', function(req, res) {
    tempdata_tb.create(new Date(),req.params.temp,function(err){
        if (err) console.log(err)
    });
    res.end();
});


router.get('/tempdata', function(req, res) {
    tempdata_tb.getAllxy(function(err, data) {
        if (err) console.log(err)
        console.log(data)
        res.send(data);
    });
});

router.get('/tempdatafrom', function(req, res) {
    time = new Date();
    time.setMinutes(time.getMinutes()-3);
    tempdata_tb.getAllFromTime_xy(time,function(err, data) {
        if (err) console.log(err)
        console.log(data)
        res.send(data);
    });
});

router.get('/tempdatafrom/:time', function(req, res) {
    time = new Date(req.params.time);
    tempdata_tb.getAllFromTime_xy(time,function(err, data) {
        if (err) console.log(err)
        console.log(data)
        res.send(data);
    });
});

module.exports = router;
