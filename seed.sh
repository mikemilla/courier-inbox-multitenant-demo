#!/usr/bin/env bash
# Seeds the demo: creates 4 tenants, adds the user to each, sends 1 inbox message
# per tenant, then mints a fresh JWT. Pure curl against the Courier REST API.
#
# The repo already ships a 120-day token in config.js, so you normally DON'T need
# this — it's here to show how the demo data was created and to let you point the
# demo at your own workspace.
#
# Usage:  COURIER_API_KEY=<your key> ./seed.sh
set -euo pipefail

KEY="${COURIER_API_KEY:?Set COURIER_API_KEY to your workspace API key}"
USER="multitenant-demo-user"
API="https://api.courier.com"

# tenant_id | Display name | title | body
TENANTS=(
  "acme|Acme Corp|Welcome to Acme Corp|Your Acme workspace inbox is live."
  "globex|Globex|Globex deploy finished|Build #481 shipped to production."
  "initech|Initech|TPS report due|Please submit your TPS report by Friday."
  "umbrella|Umbrella Inc|Security alert|New sign-in to your Umbrella account."
)

echo "Ensuring user profile exists…"
curl -s -o /dev/null -X PUT "$API/profiles/$USER" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  --data-raw '{"profile":{}}'

for row in "${TENANTS[@]}"; do
  IFS='|' read -r TID NAME TITLE BODY <<< "$row"
  echo "→ $NAME ($TID)"
  curl -s -o /dev/null -X PUT "$API/tenants/$TID" \
    -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
    --data-raw "{\"name\":\"$NAME\"}"
  curl -s -o /dev/null -X PUT "$API/users/$USER/tenants/$TID" \
    -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
    --data-raw '{}'
  curl -s -o /dev/null -X POST "$API/send" \
    -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
    --data-raw "{\"message\":{\"to\":{\"user_id\":\"$USER\",\"context\":{\"tenant_id\":\"$TID\"}},\"content\":{\"title\":\"$TITLE\",\"body\":\"$BODY\"},\"routing\":{\"method\":\"single\",\"channels\":[\"inbox\"]}}}"
done

echo "Minting a fresh 120-day JWT for $USER…"
TOKEN=$(curl -s -X POST "$API/auth/issue-token" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  --data "{\"scope\":\"user_id:$USER inbox:read:messages inbox:write:events read:preferences write:preferences read:brands\",\"expires_in\":\"120 days\"}" \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")

echo
echo "Paste this into config.js as the \`jwt\` value:"
echo "$TOKEN"
