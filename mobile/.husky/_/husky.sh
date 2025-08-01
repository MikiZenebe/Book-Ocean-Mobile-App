#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "> husky (debug) $1"
  }
  readonly hook_name="$(basename "$0")"
  debug "current working directory is $(pwd)"
  debug "husky hook-name: $hook_name"
fi
