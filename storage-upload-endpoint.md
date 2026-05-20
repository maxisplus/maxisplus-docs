# Storage Upload Endpoint

Use this endpoint to save a CSV into Supabase Storage under a customer-specific path.

## Endpoint

`PUT /storage/:bucket/:customerSlug/arquetipos.csv`

`POST /storage/:bucket/:customerSlug/arquetipos.csv`

Both methods are supported.

## Auth

The endpoint accepts either:

- a Supabase user JWT:
  - `Authorization: Bearer <supabase_jwt>`
- a machine secret:
  - `X-Storage-Api-Key: <secret>`

For browser code, prefer the Supabase JWT path. Do not expose the machine secret in frontend JavaScript.

## Path format

The uploaded object path is:

`<customerSlug>/arquetipos.csv`

Example:

`acme/arquetipos.csv`

## Body formats

The endpoint accepts either:

- `multipart/form-data` with a `File`
- raw CSV text in the request body

If you send `multipart/form-data`, the server will use the first file field it finds.

## Response

Success:

```json
{
  "success": true,
  "bucket": "your-bucket",
  "path": "acme/arquetipos.csv",
  "authenticatedAs": {
    "type": "user",
    "userId": "..."
  }
}
```

If the machine secret is used, `authenticatedAs.type` will be `api-key`.

## Browser example

```ts
const form = new FormData();
form.append("file", csvFile);

await fetch(`${API_URL}/storage/${bucket}/${customerSlug}/arquetipos.csv`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${supabaseJwt}`,
  },
  body: form,
});
```

## Machine-to-machine example

```ts
await fetch(`${API_URL}/storage/${bucket}/${customerSlug}/arquetipos.csv`, {
  method: "PUT",
  headers: {
    "X-Storage-Api-Key": storageApiKey,
    "Content-Type": "text/csv",
  },
  body: csvText,
});
```

## Notes

- The bucket must already exist in Supabase.
- The endpoint uses the service role on the server side to write to Storage.
- If your frontend has no auth at all, route the upload through your own backend or use the machine secret from a trusted environment only.
