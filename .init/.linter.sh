#!/bin/bash
cd /home/kavia/workspace/code-generation/office-employee-management-system-105-537/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

