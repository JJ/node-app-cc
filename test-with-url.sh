#!/bin/bash

URL=$1

if [[ "${URL}" == "" ]]; then
    URL="http://localhost:5000"
fi

echo "Crea porra"
curl -X PUT "${URL}/porra/SEV/BET/Copa/2012"
echo "Crea apuesta"
curl -X PUT "${URL}/apuesta/DN/Copa/2012/SEV/2/BET/2"
echo "Recupera apuestas"
curl "${URL}/porras"

