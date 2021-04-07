#!/bin/bash

API="http://localhost:4741"
URL_PATH="/lifeSections"

curl "${API}${URL_PATH}/${LSID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
