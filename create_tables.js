
// database setup
var db = require('./db.js')

db.connect(function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        console.log('Connected to mysql db')
    }
});

var GenData = require('./models/gen_time_data.js')
var aux1 = new GenData('temp_aux1')
var aux2 = new GenData('temp_aux2')
var vreg = new GenData('temp_vreg')
var v_in = new GenData('v_in')
aux1.build_table();
aux2.build_table();
vreg.build_table();
v_in.build_table();


//process.exit();
