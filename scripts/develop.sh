#!/bin/sh

export NODE_ENV=development

./scripts/_manifest.sh

./node_modules/.bin/webpack-dev-server --hot