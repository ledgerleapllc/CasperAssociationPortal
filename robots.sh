#!/bin/bash
FRONTEND_URL=$(cat .env | grep 'VITE_FRONTEND_URL' | awk -F '=' '{print $2}' | awk -F '://' '{print $2}')

if [[ "$FRONTEND_URL" != "members.casper.network" ]]; then 
	if [ -d \"dist\" ]; then
		cp robots.txt dist/robots.txt
	fi
fi
