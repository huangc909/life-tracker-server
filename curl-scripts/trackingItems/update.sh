
API="http://localhost:4741"
URL_PATH="/lifeSections/${LSID}/trackingItems/${TIID}"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "trackingItem": {
      "name": "'"${NAME}"'",
      "date": "'"${DATE}"'",
      "startTime": "'"${START}"'",
      "endTime": "'"${END}"'",
      "duration": "'"${DUR}"'"
    }
  }'

echo
