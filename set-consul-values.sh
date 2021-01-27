#!/bin/bash

consul info
if [ $? -ne 0 ]; then
    consul agent -dev -node machine &
    sleep 2
fi

consul kv put hitosIV/port 31415
