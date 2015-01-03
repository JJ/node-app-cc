#!/bin/bash

URL=$1

if [[ "${URL}" == "" ]]; then
    URL="http://localhost:5000"
fi

echo "Crea porra"
curl -X PUT "${URL}/porra/Copa/2012/SEV/BET"
echo "Crea apuestas"
curl -X PUT "${URL}/apuesta/DN/Copa/2012/SEV/2/BET/2"
curl -X PUT "${URL}/apuesta/DU/Copa/2012/SEV/3/BET/2"
curl -X PUT "${URL}/apuesta/DK/Copa/2012/SEV/2/BET/3"
curl -X PUT "${URL}/apuesta/KD/Copa/2012/SEV/2/BET/2"
echo "Recupera apuestas"
curl "${URL}/porras"
echo "Pone resultado"
curl -X POST "${URL}/porra/resultado/Copa/2012/SEV/2/BET/2"
echo "Recupera ganador"
curl  "${URL}/porra/ganador/Copa/2012/SEV/BET"
