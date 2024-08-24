#!/bin/bash

node api/server.js &

CURRENT_DIR=$(pwd)

cd frontend
npm install
npm run build

cd ..

cd frontend
npx serve -s dist -p 8081 &

cd "$CURRENT_DIR"

node run_job.js &