###
 # :Author: June
 # :Date: 2022-03-23 13:29:59
 # :LastEditTime: 2022-03-23 13:29:59
 # :Description:
###
#!/bin/sh
command_exists () {
    command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
    exec < /dev/tty
fi
