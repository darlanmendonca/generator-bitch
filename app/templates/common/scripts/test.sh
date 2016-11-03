#!/bin/bash

set -e

karma start karma.js

if [ ! -z "$EXPORT_COVERAGE" ]; then
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

	rm -rf ./coverage
fi

