#!/bin/bash


scp  app.js pi@192.168.0.103:~/tempdata_app/
scp -r bin pi@192.168.0.103:~/tempdata_app/
scp -r models pi@192.168.0.103:~/tempdata_app/
scp -r public pi@192.168.0.103:~/tempdata_app/
scp -r routes pi@192.168.0.103:~/tempdata_app/
scp -r views pi@192.168.0.103:~/tempdata_app/
scp  db.js pi@192.168.0.103:~/tempdata_app/
scp  package.json pi@192.168.0.103:~/tempdata_app/


