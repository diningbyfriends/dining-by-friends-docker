#!/usr/bin/env bash
sleep 15
echo "Adding Data to TinkerGraph"
cd /opt/data
npm install
echo "Running Init Script"
node init.js
sleep 0.5

echo "Starting Theia"
cd /home/theia
yarn theia start /home/project --hostname 0.0.0.0 --port 3000

tail -f /dev/null