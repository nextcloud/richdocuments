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

## API

### Listing templates

Send a GET to:

`<server>/ocs/v2.php/apps/richdocuments/api/v1/templates/<type>`

Here type can be:

* document
* spreadsheet
* presentation

This returns a list of templates with

* id
* name
* link to preview
* extension

### Template previews

Send a GET to:

`<server>/apps/richdocuments/templates/<id>`

Where `id` is the id of the template obtained in the listing. This returns back
an image (jpeg or png). For displaying.

### Creating document based on a template

Send a POST to

`<server>/ocs/v2.php/apps/richdocuments/api/v1/templates/new`

with:
* `path`: the full path relative to the user where to create the document, including new file name
* `template`: the template id you want to create

## Web frontend

When clicking on a new document a selection popup appears listing the
available templates.

The user can select a template, possible change the name and create it.

This is similar to the current flow with the difference that the user can now
select a template.
