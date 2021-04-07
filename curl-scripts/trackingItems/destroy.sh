
API="http://localhost:4741"
URL_PATH="/lifeSections/${LSID}/trackingItems/${TIID}"

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \

echo
