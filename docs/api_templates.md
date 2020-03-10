
# Templates API

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
