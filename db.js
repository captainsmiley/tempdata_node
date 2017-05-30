var mysql = require('mysql')
var async = require('async')

var state = {
    pool: null,
    mode: null,
}


exports.connect = function(done) {

    state.pool = mysql.createPool({
        host: 'localhost',
        user: 'tempdata_app',
        password: 'thetempdatapass',
        database: 'data'
    });


    done();
}

exports.get = function() {
    return state.pool
}



