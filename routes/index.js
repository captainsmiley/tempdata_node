var express = require('express');
var router = express.Router();
var tempdata_tb = require('../models/tempdata.js')

/* GET home page. */
router.get('/', function(req, res) {
    tempdata_tb.create(new Date(),23.5,function(err){
        if (err) console.log(err)
        
    });
    tempdata_tb.getAll(function(err, rows) {
        if (err) console.log(err)
        console.log(rows)
        for (var i in rows) {
            var row = rows[i];
            console.log(row.time);
        }
    });
  res.render('index', { title: 'Express' });
});

module.exports = router;
