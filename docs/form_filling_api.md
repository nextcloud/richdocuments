<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
# Form extraction/filling API

This API can be used to extract form data from files and to fill out forms of an existing file and store it.

## Extract forms

```
GET /ocs/v2.php/apps/richdocuments/api/v1/template/fields/extract/{fileId}
```

### Parameters

| Parameter   | Format                                 | Description                                |
|-------------|----------------------------------------|--------------------------------------------|
| fileId      | numeric                                | file id of the file to extract fields from |

### Response data

The response will be a list of fields where each field can have the following properties:

| Parameter | Format  | Description                                                            |
|-----------|---------|------------------------------------------------------------------------|
| index     | string  | unique identifier for the field, to be used when filling out forms     |
| content   | string  | current content of the field                                           |
| type      | string  | one of `rich-text`, `checkbox`, `drop-down-list`, `picture`, `date`    |
| alias     | ?string | User facing name of the field                                          | 
| id        | ?string | Additional metadata when extracting open document format form controls | 
| tag       | ?string | Additional metadata when extracting open document format form controls | 

### Sample request
```
 curl https://nextcloud.local/ocs/v2.php/apps/richdocuments/api/v1/template/fields/extract/37526 \
 	-u "admin:admin"
 	-H "OCS-APIRequest: true" 
```

### Sample response

```
{
  "ocs": {
    "meta": {
      "status": "ok",
      "statuscode": 200,
      "message": "OK"
    },
    "data": [
      {
        "index": "0",
        "content": "Julius Härtl",
        "type": "rich-text",
        "alias": "Employee name",
        "id": null,
        "tag": null
      },
      {
        "index": "1",
        "content": "",
        "type": "rich-text",
        "alias": "Vacation date from",
        "id": null,
        "tag": null
      }
    ]
  }
}
```

## Fill out form fields

Opening public share links requires federated editing being properly setup between the two servers.

```
POST /ocs/v2.php/apps/richdocuments/api/v1/template/fields/fill/{fileId}
```

### Parameters

| Parameter   | Format                                 | Description                                                               |
|-------------|----------------------------------------|---------------------------------------------------------------------------|
| fileId      | numeric                                | file id of the source file to fill out                                    |
| fields      | object<string, object{content: string}>  | Fields to be filled out with string content, identified by a string index as unique identifier |
| destination | ?string                                | If passed the resulting file will be stored at this path                  | 

```
 curl https://admin:admin@nextcloud.local/ocs/v2.php/apps/richdocuments/api/v1/template/fields/fill/37526 \
  	-H "Accept: application/json"
 	-H "Content-Type: application/json"
 	-X POST \
 	-H 'OCS-APIRequest: true' \  
 	--data '{"fields":{"0": {"content":"FooBar"}},"destination":"foobar.pdf"}'
```
