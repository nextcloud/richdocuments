# Mobile Editor OCS API

This API is used to obtain a link for a document to load from mobile apps. The link will contain a
one-time token that can be used once for opening a document in an anonymous browser session or
webview on mobile devices in the context of the user.

## Creating a link for a local file

```
<server>/ocs/v2.php/apps/richdocuments/api/v1/document
```

A `POST` request to this endpoint with the `fileid` parameter will preprare the server to serve this
document.

The returned xml or json will have an url to open in a webview.

## Creating a link for public share links

Opening public share links requires federated editing being properly setup between the two servers.

```
<server>/ocs/v2.php/apps/richdocuments/api/v1/share
```

A `POST` request to this endpoint with the following parameters preprare the server to serve this
document:

| Parameter | Type | Description | Example |
|---|---|---|---|
| shareToken | string | Share token of the public share link | Qf5toz6JD7Tn7eD |
| host | string (optional) | Base URL of the Nextcloud isntance the share link is located on | http://cloud.example.com |
| path | string (optional) | Path to the file in case the share link is a directory | /path/to/file.odt |
| password | string (optional) | Optional password to gain access to the share | secret |

The returned xml or json will have an url to open in a webview.

The endpoint can be used with or without user credentials for the Nextcloud server. 
For anonymous requests the webview will ask the user for a guest name on writable 
files. When requesting a link as an authenticated user, the user will join the
document as a guest but with their user details provided by their own instance. 
