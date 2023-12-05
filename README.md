# figma-updates-to-slack

To install dependencies:

```bash
bun install
```

test locally with netlify: 

run netlify dev server: `netlify dev`

> this will by default run on port `8888`

send a test post
```
curl -X POST http://localhost:8888/.netlify/functions/figma-webhook-handler \
-H "Content-Type: application/json" \
-d '{
  "created_at": "2020-02-23T20:27:16Z",
  "description": "Wrote new documentation for webhooks v2",
  // CHANGE THE EVENT TYPE TO TEST DIFFERENT EVENTS
  "event_type": "LIBRARY_PUBLISH", 
  "file_key": "CL06nJNn5eZLQKDoARMND5",
  "file_name": "Developer page mockup demo",
  "label": "Added new documentation!",
  "passcode": "99d269a6d17b5752c20b3bad2fe32bd3ce3beb220903175e0feadfe00ed1913e",
  "timestamp": "2020-02-23T20:27:16Z",
  "triggered_by": {
    "id": "813845097374535682",
    "handle": "Dylan Field"
  },
  "version_id": "443",
  "webhook_id": "22"
}'
```

### Register Figma Webhooks


```
bun run figma-webhooks:register:library-publish
```
```
bun run figma-webhooks:register:file-delete
```

Environment Variables:

```
SLACK_WEBHOOK_URL=
FIGMA_TEAM_ID=
FIGMA_ACCESS_TOKEN=
ENDPOINT=DEPLOYED_URL
SLACK_WEBHOOK_URL=
PASSCODE=
```
