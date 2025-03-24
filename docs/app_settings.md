<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
## Nextcloud Office App Settings

### Collabora Online Server
URL (and port) of the Collabora Online server that provides the editing functionality as a WOPI client. Collabora Online should use the same protocol (http:// or https://) as the server installation. Naturally, https:// is recommended.

### Restrict usage to specific groups
By default the app is enabled for all. When this setting is active, only members of specified groups can use Nextcloud Office.

### Restrict edit to specific groups
By default all users can edit documents with Nextcloud Office. When this setting is active, only the members of specified groups can edit, others can only view documents.

### Use OOXML by default for new files
By default new files created by users are in OpenDocument Format (ODF). When this setting is active, new files will be created in Office Open XML (OOXML) format.

### Enable access for external apps
Nextcloud internally passes an access token to Collabora Online that is used later by it to do various operations. By default, it's not possible to generate this token by 3rd parties; only Nextcloud can generate and pass it to Collabora Online.

In some applications, it might be necessary to generate the token by a 3rd party application. For this, one needs to add the 3rd party application (external apps) in this setting. You need to add an application identifier and a secret
token. These credentials then can be used by the 3rd party application to make calls to `wopi/extapp/data/{fileId}` to fetch the access token and URL source for given fileId, both required to open a connection to Collabora Online.

### Canonical webroot
Canonical webroot, in case there are multiple, for Collabora Online to use. Provide the one with least restrictions. E.g.: Use non-shibbolized webroot if this instance is accessed by both shibbolized and non-shibbolized webroots. You can ignore this setting if only one webroot is used to access this instance.

### Theme

By default Nextcloud Office comes with Nextcloud theme (monochrome icons following Nextcloud style), to change to a more traditional office look:

	occ config:app:set richdocuments theme --value="collabora"

To go back to default theme:

	occ config:app:set richdocuments theme --value="nextcloud"

### Previews

By default Nextcloud will generate previews of Office files using the Collabora file conversion endpoint. This can be turned off through

	occ config:app:set richdocuments preview_generation --type boolean --lazy --value true

### Electronic signature
From a shell running in the Nextcloud root directory, run the following `occ`
command to configure a non-default base URL for eID Easy. For example:

	occ config:app:set richdocuments esignature_base_url --type string --value https://test.eideasy.com 

### UI mode

Switching between classic and tabbed view is possible as a default, however users can still change this while using Office:

	occ config:app:set richdocuments uiDefaults-UIMode --type string --value classic

### Disable local editing

In case no desktop client is used on an instance you may disable the local editing button within office with:

	occ config:app:set richdocuments open_local_editor --type string --value no
