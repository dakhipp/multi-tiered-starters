#!/bin/bash

mongod --fork --syslog

echo 'db.createUser({ user: "root", pwd: "toor", roles: [{ role: "readAnyDatabase", db: "admin" }]});' | mongo admin

echo 'db.auth("toor", "toor");' | mongo admin

mongod --shutdown
