# Mobile flow

To enable collabora editor into a client there are a few things that need to be 
care off.

## 1. Check for support

Check the capabilities API

`<server>/ocs/v2.php/cloud/capabilities`

If this contains a richdocument section then mobile editing is supported.
There is a list of mimetypes that can be edited with collabora supplied.

## 2. Open a file with a fileid

This happens via the OCS api described [here](./mobile_editor.md)
This returns an URL that you have to open in a full screen webview.
Be sure to have javascript enabled.

## 3. Interacting with the document

The richdocuments app looks for a javscript handler that the client can
register. This is: `RichDocumentsMobileInterface`

It expects the following functions:

### close()

This closed the webview.

### insertGraphic()

open a filepicker to select a file from your nextcloud.
The file has to be submitted to the [asset api](./asset_api.md).

Then the client has to call the function (on the webui):
`OCA.RichDocuments.documentsMain.postAsset(filename, url)`

This will make sure the assets is added to the document.

### share()

opens the share sidebar or dialog for the current file

### documentLoaded()

This method is called once the Collabora has loaded and can take over the loading screen

### paste()

This is triggered to enable integrating applications passing though the clipboard content properly

### fileRename()

Notifies the integrating application that the current file has been renamed.

### downloadAs()

Hands over the link to download a file to the integrating application

