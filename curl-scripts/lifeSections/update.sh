#!/bin/bash

API="http://localhost:4741"
URL_PATH="/lifeSections"

curl "${API}${URL_PATH}/${LSID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "lifeSection": {
        "name": "'"${NAME}"'"
      }
    }'

echo
