#!/bin/sh

API="http://localhost:4741"
URL_PATH="/lifeSections"

curl "${API}${URL_PATH}/${LSID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
