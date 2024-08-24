#!/bin/bash

npm install create-vue@latest
npm create vue@latest frontend -- --template vite --router --no-ts --no-vuex --no-csspreprocessor --no-linter --no-tests
cd frontend
npm install
