#!/bin/bash

echo "==============================="
echo "      Starting Backend...       "
echo "==============================="
npm --prefix ./backend start &

echo "==============================="
echo "    Starting Frontend on port 8080...    "
echo "==============================="
npm run preview -- --port 8080 --host &

wait # Wait for both background processes to complete

echo "==============================="
echo "     Both servers are running!  "
echo "==============================="
