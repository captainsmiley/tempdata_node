var express = require('express');
var router = express.Router();
var tempdata_tb = require('../models/tempdata.js')
var GenData = require('../models/gen_time_data.js')
var aux1 = new GenData('temp_aux1');
var aux2 = new GenData('temp_aux2');
var vreg = new GenData('temp_vreg');
var v_in = new GenData('v_in');


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

router.post('/send/', function(req, res) {
    var temp_aux1 = req.body.temp_aux1;
    var temp_aux2 = req.body.temp_aux2;
    var temp_vreg = req.body.temp_vreg;
    var v_in = req.body.v_in;

    if (temp_aux1) {
        aux1.create(new Date(),temp_aux1,function(err) {
            if (err) console.log(err)
        });
    }


    console.log("Aux1: " + temp_aux2);
    /*
    tempdata_tb.create(new Date(),req.params.temp,function(err){
        if (err) console.log(err)
    });
    */
    res.send(temp_aux1);
});


router.get('/tempdata', function(req, res) {
    tempdata_tb.getAllxy(function(err, data) {
        if (err) console.log(err)
        res.send(data);
    });
});

router.get('/tempdatafrom', function(req, res) {
    time = new Date();
    time.setMinutes(time.getMinutes()-3);
    tempdata_tb.getAllFromTime_xy(time,function(err, data) {
        if (err) console.log(err)
        res.send(data);
    });
});

router.get('/lastday', function(req, res) {
    time = new Date()
    time.setDate(time.getDate()-1);
    res.render('tempdata', { title: 'Tempdata last day' , time : time});
});
    

router.get('/tempdatafrom/:time', function(req, res) {
    time = new Date(req.params.time);
    tempdata_tb.getAllFromTime_xy(time,function(err, data) {
        if (err) console.log(err)
        res.send(data);
    });
});

module.exports = router;
