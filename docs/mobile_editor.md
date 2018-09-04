# Mobile Editor OCS API

This API is used to obtain a link for a document to load from mobile apps

## Creating the link

```
<server>/ocs/v2.php/apps/richdocuments/api/v1/document
```

A `POST` request to this endpoint with the `fileid` parameter will
preprare the server to serve this document.

The returned xml or json will has an url to open in a webview.
