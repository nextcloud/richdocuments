# Wopi

This is an application for [Nextcloud](https://nextcloud.com) that allows you 
to edit office documents in Microsoft office online server. 
The application implements the api described on the page https://wopi.readthedocs.io/projects/wopirest/en/latest/. 
List of implemented methods
* FILE OPERATIONS
  * CheckFileInfo
  * GetFile
  * Lock
  * GetLock
  * RefreshLock
  * Unlock
  * UnlockAndRelock
  * PutFile
  * PutRelativeFile
  * RenameFile

## Installation

### Server

You will need an working Microsoft Office Online server to connect to.
The office server must have access to the nextcloud server at the same 
address at which the user accesses the nextcloud server.

### Nextcloud app

In your Nextcloud, simply navigate to »Apps«, choose the category »Office & text«, 
find the Wopi app and enable it. Then open the administrator settings, 
navigate to the »Office Online« tab and specify your Office Online server url.

### Nextcloud/Wopi relation

For the latest information about the Wopi and Nextcloud releases, please visit the:

[Apps page of Wopi](https://apps.nextcloud.com/apps/wopi).

### Federated editing / Global Scale
Collaborative editing of federated documents requires Wopi version 3.4 on all 
involved servers. Besides that the following conditions must be met:

- Make sure the remote server is added as a trusted server


## Building the app

The app can be built by using the provided Makefile by running:

    make

This requires the following things to be present:
* make
* which
* tar: for building the archive
* curl: used if phpunit and composer are not installed to fetch them from the web

The make command will install or update Composer dependencies.
The archive is then located in build/artifacts/appstore.

