#!/bin/sh

export NODE_ENV=production

rm -rf ./dist

./scripts/_manifest.sh

./node_modules/.bin/webpack -p --profile