var db = require('../db.js')



exports.create = function(dateTime,temp,done) {
    var values = [dateTime.toISOString().
        replace(/T/,' ').
        replace(/\..+/,''),
        temp]
    db.get().query('INSERT INTO tempdata (time, temp) VALUES(?,?)', values, function (err,result) {
        if (err) return done(err)
        done(null,result.insertId)
    })
}

exports.getAll = function(done) {
    db.get().query('SELECT * FROM tempdata', function(err,rows) {
        if (err) return done(err)
        done(null,rows)
    })
}

exports.getAllxy = function(done) {
    db.get().query('SELECT * FROM tempdata', function(err,rows) {
        if (err) return done(err)
        var data = [];
        for(i=0; i<rows.length; i++) {
            data.push({x: rows[i].time, y: rows[i].temp});
        }

        done(null,data)
    })
}

function toXy(rows) {
        var data = [];
        for(i=0; i<rows.length; i++) {
            data.push({x: rows[i].time, y: rows[i].temp});
        }
    return data;
}

exports.getAllFromTime_xy = function(time, done) {
    var value = time.toISOString().
        replace(/T/,' ').
        replace(/\..+/,'');
    db.get().query(
        'SELECT * FROM tempdata where time >= \''+value+'\' '
        , function(err,rows) {
        if (err) return done(err)
        var data = toXy(rows);
        done(null,data)
    })
}
