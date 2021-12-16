## Frontend integration API

### Configuration

The Nextcloud Office configuration for creating new files with their mimetype and extension per file type is exposed to `OCA.RichDocuments.config.create`.

```json
{
  "create": {
    "document": {
      "extension": "odt",
      "mime": "application/vnd.oasis.opendocument.text"
    },
    "spreadsheet": {
      "extension": "ods",
      "mime": "application/vnd.oasis.opendocument.spreadsheet"
    },
    "presentation": {
      "extension": "odp",
      "mime": "application/vnd.oasis.opendocument.presentation"
    }
  }
}
```

### Open viewer


The following two methods are exposed in order to manually trigger the Nextcloud Office viewer opening a file:

#### Open an existing file

`OCA.RichDocuments.open(params)` will open the Collabora view for an existing file.

Params requires the following properties:
- fileId: (string) internal file id
- path: (string) full path to the file
- fileModel: (OCA.Files.FileInfoModel) model of the file that will be opened
- fileList: (object) optional file list object


```javascript
OCA.RichDocuments.open({
	fileId: 1234,
	path: '/path/to/file.odt',
	fileModel: new OCA.Files.FileInfoModel({...})
    fileList: FileList
})
```

#### Create a new file from a template

`OCA.RichDocuments.openWithTemplate(params)` provides a method to open a Collabora view for a file that should be created from a template. Calling this method requires the file to be already present on the filesytem and shown in the file list.

Params requires the following properties:
- fileId: (string) internal file id
- path: (string) full path to the file
- templateId: (string) file id of the template
- fileModel: (OCA.Files.FileInfoModel) model of the file that will be opened
- fileList: (object) optional file list object

```javascript
OCA.RichDocuments.openWithTemplate({
	fileId: -1,
	path: '/path/to/file.odt,
	templateId: templateId,
    fileModel: new OCA.Files.FileInfoModel({...})
})
```

Changes to the fileModel should be propagated by triggering a backbone `change` event:

```javascript
window.OCA.RichDocuments.FilesAppIntegration.registerHandler('actionFavorite', (filesAppIntegration) => {
    // custom logic here
    // make sure to trigger a change on the file info model object like this:
    filesAppIntegration.getFileModel().trigger('change', newFileModel)
    return true
})
```

### Handlers

Handlers provide a way to hook into the files app integration in order to inject custom behaviour during certain actions.

The return value indicates if the default behavour should be blocked (true) or still be executed (false).

The following handlers are currently supported:

- initAfterReady: will be called once the Collabora frame has been loaded
- close: will be called after the Collabora view has been closed
- saveAs: will be called on a save_as response by Collabora
- share: will be called before the default share action is triggered
- rename: will be called before the default rename action is triggered (the new filename is available as a property of the filesAppIntegration parameter)
- showRevHistory: will be called before the default show revision history action is triggered
- insertGraphic: will be called when an image from the Nextcloud storage should be inserted
  - Arguments
    - insertFileFromPath(path): Callback to trigger the actual inserting of the graphic from an absolute file path

In addition, the following handlers can be used to overwrite the handling of file actions that are rendered in the Nextcloud header bar:
- actionDetails
- actionDownload
- actionFavorite

The filesAppIntegration parameter can be used to extract the current context of the edited file. The following properties are available for that:
- fileName
- fileId

The callback function of each handler will be called with the following parameters:
- filesAppIntegration: current instance of the filesAppIntegration object
- arguments (optional): see list of supported handlers for details

The following code shows an example on how to register the different handlers:

```javascript
(function() {

	OCA.RichDocuments.FilesAppIntegration.registerHandler('initAfterReady', (filesAppIntegration) => {
		console.debug('called initAfterReady', filesAppIntegration)
		return false
	})

	OCA.RichDocuments.FilesAppIntegration.registerHandler('close', (filesAppIntegration) => {
		console.debug('called close', filesAppIntegration)
		return false
	})

	OCA.RichDocuments.FilesAppIntegration.registerHandler('share', (filesAppIntegration) => {
		console.debug('called share', filesAppIntegration)
		return false
	})

	OCA.RichDocuments.FilesAppIntegration.registerHandler('rename', (filesAppIntegration) => {
		console.debug('called rename', filesAppIntegration)
		return false
	})


	OCA.RichDocuments.FilesAppIntegration.registerHandler('showRevHistory', (filesAppIntegration) => {
		console.debug('called showRevHistory', filesAppIntegration)
		return false
	})

    OCA.RichDocuments.FilesAppIntegration.registerHandler('insertGraphic', (filesAppIntegration, { insertFileFromPath }) => {
        const path = prompt('Enter a file path', '')
        insertFileFromPath(path)
        return true
    })

})()
```

## Events

Events are emitted through the `@nextcloud/event-bus` for the different document loading states.

### Files app scope

When Collabora files are opened through the files app integration (either in the files app or on public share pages), the following events will be emitted to be able to track document opening progress and its success or failure state.

```
subscribe('richdocuments:file-open:started', data => console.error('richdocuments:file-open:started', data))
subscribe('richdocuments:file-open:succeeded', data => console.error('richdocuments:file-open:succeeded', data))
subscribe('richdocuments:file-open:failed', data => console.error('richdocuments:file-open:failed', data))
```

Event names:
- richdocuments:file-open:started
- richdocuments:file-open:succeeded
- richdocuments:file-open:failed

Data properties:


- currentUser (string|null): user id of the currently logged-in user
- file (object)
	- fileId (integer|undefined): undefined for single public shares, otherwise the file id is available
	- filePath (string): "/testfile.odt"
	- sharingToken (string|undefined): Optional sharing token when opened on a public share link
- reason (string): Only for a failed event, timeout|collabora
- collaboraResponse (object); Optional when reason is collabora

Example succeeded event data:
```
{
  "currentUser": "admin",
  "file": {
    "fileId": "204",
    "filePath": "/test.odt",
    "sharingToken": undefined
  }
}
```

Example failed event data:
```
{
  "reason": "collabora",
  "collaboraResponse": "WOPI::GetFile failed: []",
  "currentUser": "admin",
  "file": {
    "fileId": "204",
    "filePath": "/test.odt",
    "sharingToken": undefined
  }
}
```

### Document scope

The event in the document scope is also emitted on direct editing through mobile apps, as there the files app integration is not available.

```
subscribe('richdocuments:wopi-load:started', data => console.error('richdocuments:wopi-load:started', data))
subscribe('richdocuments:wopi-load:succeeded', data => console.error('richdocuments:wopi-load:succeeded', data))
subscribe('richdocuments:wopi-load:failed', data => console.error('richdocuments:wopi-load:failed', data))
```

Event names:
- richdocuments:wopi-load:started
- richdocuments:wopi-load:succeeded
- richdocuments:wopi-load:failed

Data properties:

- wopiFileId (string): file id constructed to be used by Collabora for the WOPI access
- reason (string): Only for a failed event, timeout|collabora
- collaboraResponse (string): Optional when failure reason is collabora


Example failed event data:
```
{
  "reason": "collabora",
  "collaboraResponse": "WOPI::GetFile failed: []",
  "wopiFileId": "288_oct9lk1km6wy"
}
```

### WOPI PostMessages

Collabora Online emits various post messages which are catched and handled by the Nextcloud Office
Integration app. Postmessages which are sent from the WOPI host (Collabora) to the editor (
Nextcloud) are also exposed through the Nextcloud event bus under the `richdocuments:wopi-post`
event name. For details on the post messages see
the [Collabora Online PostMessage API documentation](WOPI host to editor).


