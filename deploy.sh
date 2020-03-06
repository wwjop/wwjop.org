#!/bin/bash

read -p "Type a description of your changes for this deployment: " message

git add .
git commit -m "$message"
git push