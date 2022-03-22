###
 # :Author: June
 # :Date: 2022-03-22 13:54:23
 # :LastEditTime: 2022-03-22 13:55:04
 # :Description:
###
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
. "$(dirname "$0")/common.sh"

[ -n "$CI" ] && exit 0

# Format and submit code according to lintstagedrc.js configuration
npm run lint:lint-staged
