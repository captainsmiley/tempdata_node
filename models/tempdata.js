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
