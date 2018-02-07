#!/bin/sh

export NODE_ENV=production

rm -rf ./dist

./node_modules/.bin/webpack -p --profile