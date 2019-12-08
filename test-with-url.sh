#!/bin/bash

URL=$1

if [[ "${URL}" == "" ]]; then
    URL="http://localhost:5000"
fi

printf "Crea porra\n"
curl -X PUT "${URL}/porra/Copa/2012/SEV/BET"
printf "\nRecupera porras\n"
curl "${URL}/porras"
printf "\nRecupera porra\n"
curl "${URL}/porra/SEV-BET-Copa-2012"
printf "\nCrea apuestas\n"
curl -X PUT "${URL}/apuesta/DN/Copa/2012/SEV/2/BET/2"
curl -X PUT "${URL}/apuesta/DU/Copa/2012/SEV/3/BET/2"
curl -X PUT "${URL}/apuesta/DK/Copa/2012/SEV/2/BET/3"
curl -X PUT "${URL}/apuesta/KD/Copa/2012/SEV/2/BET/2"
printf "\nRecupera apuestas\n"
curl "${URL}/porras"
printf "\nPone resultado\n"
curl -X POST "${URL}/porra/resultado/Copa/2012/SEV/2/BET/2"
printf "\nRecupera ganador\n"
curl  "${URL}/porra/ganador/Copa/2012/SEV/BET"
