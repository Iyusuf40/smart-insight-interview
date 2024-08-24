#!/bin/bash

node api/server.js &

./createFrontend.sh
./buildFrontend.sh
./serveFrontend.sh &

node run_jobs.js &