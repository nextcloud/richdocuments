# Assets API

This api is used to insert files directly from your Nextcloud to a Collabora
Online document.

## Creating the asset

```
<server>/apps/richdocuments/assets
```

A `POST` request to this endpoint with the `path` parameter will 
prepare the asset as `path` (relative to the authenticated user).

The return is json:

```json
{
  url: <assetUrl>
}
```

The `assetUrl` has to be send to the Collabora Online server using the
postMessage API.

## Fetching an asset

An asset can be fetched once from the url obtained when creating the asset.
The asset will be served with a proper `Content-Type`.
 
