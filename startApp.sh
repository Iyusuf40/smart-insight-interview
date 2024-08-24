#!/bin/bash

node api/server.js &

CURRENT_DIR=$(pwd)

./createFrontend.sh
./buildFrontend.sh
./serveFrontend.sh &

cd "$CURRENT_DIR"

node run_job.js &