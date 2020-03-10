# Templates

Often users will use the same templates. This documents describes the flow and
APIs that will eventually come into place.

## Template location

There are two kind of templates:

1. system wide templates
2. user defined templates

Both should be simple template files and preview for them should be obtained using
the preview API. The richdocuments works as a preview provider so it should provide
proper previews to use.

### System wide templates

An admin can configure system wide templates. This can be done from the admin
settings.

These templates are stored in the AppData.

> Note: it might require some less pretty code to get the previews out of the
appdata. But since it will also work on 13 we have no real alternative.

There are a few special templates that are shipped with the app. The empty
files. They should always be available.

### User defined templates

In the Collabora user settings the user can select a folder from where to load
templates. This can be any folder the user has access to. So users can share template
folders among each other.

### Replacing empty templates

Empty template files can be replaced the existing files in `appdata_[instanceid]/richdocuments/empty_templates/`. The files can be reverted to the templates shipped with the release by running the  `occ richdocuments:update-empty-templates` command.