
var db = require('../db.js')

function Data(name) {
    this.name = name;
    //console.log(this.name + " created");
}


Data.prototype.build_table = function(){
    var name = this.name;
    db.get().query("CREATE TABLE IF NOT EXISTS "+ name+ " ("+
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "time DATETIME,"+
        "value DECIMAL(5,2)"+
    ")"
        ,function (err,result) {
        if (err) throw err;
            console.log('Table '+name+' created');
        });
}


Data.prototype.create = function(dateTime,value,done) {
    var data_name = this.name;
    var values = [dateTime.toISOString().
        replace(/T/,' ').
        replace(/\..+/,''),
        value]
    console.log(dateTime);
    console.log(values);
    db.get().query("INSERT INTO "+data_name+" (time, value) VALUES(?,?)", values, function (err,result) {
        if (err) return done(err)
        done(null,result.insertId)
    })
}


Data.prototype.getAll = function(done) {
    var data_name = this.name;
    db.get().query('SELECT * FROM '+data_name, function(err,rows) {
        if (err) return done(err)
        done(null,rows)
    })
}

function toXy(rows) {
        var data = [];
        for(i=0; i<rows.length; i++) {
            var t = new Date(rows[i].time);
            console.log(rows[i].time);
            data.push({x: t, y: rows[i].temp});
        }
    return data;
}

Data.prototype.getAllxy = function(done) {
    var name = this.name;
    db.get().query('SELECT * FROM '+name, function(err,rows) {
        if (err) return done(err)
        var data = toXy(rows);
        /*
        for(i=0; i<rows.length; i++) {
            data.push({x: rows[i].time, y: rows[i].temp});
        }
        */

        done(null,data)
    })
}


Data.prototype.getAllFromTime_xy = function(time, done) {
    var name = this.name;
    var value = time.toISOString().
        replace(/T/,' ').
        replace(/\..+/,'');
    db.get().query(
        'SELECT * FROM '+name+' where time >= \''+value+'\' '
        , function(err,rows) {
        if (err) return done(err)
        var data = toXy(rows);
        done(null,data)
    })
}

module.exports = Data;
