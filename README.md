<!--
  - SPDX-FileCopyrightText: 2016-2024 Nextcloud GmbH and Nextcloud contributors
  - SPDX-FileCopyrightText: 2013-2016 ownCloud, Inc.
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
# Nextcloud Office

[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud/richdocuments)](https://api.reuse.software/info/github.com/nextcloud/richdocuments)

**A [Nextcloud](https://nextcloud.com) app integrating Collabora Online into your Nextcloud!**

![](https://raw.githubusercontent.com/nextcloud/richdocuments/main/screenshots/Nextcloud-writer.png)

Nextcloud Office supports editing your documents in real time with multiple other editors, showing high fidelity, WYSIWYG rendering and preserving the layout and formatting of your documents.

Users can insert and reply to comments and invite others without a Nextcloud account for anonymous editing of files with a public link shared folder.

Nextcloud Office supports dozens of document formats including DOC, DOCX, PPT, PPTX, XLS, XLSX + ODF, Import/View Visio, Publisher and many more…

Nextcloud Office is based on the Collabora Online Development Edition (CODE) and is available free and under heavy development, adding features and improvements all the time! Enterprise users have access to the more stable, scalable Collabora Online Enterprise based version through a Nextcloud support subscription.

## Installation

Nextcloud Office is built on Collabora Online which requires a dedicated service running next to the Nextcloud webserver stack. There are several ways to run the coolwsd service. For full details, see the related section in the admin manual https://docs.nextcloud.com/server/latest/admin_manual/office/index.html

This repository covers only the Nextcloud integration app which requires a Collabora Online server to connect to.

Note: it is possible to use Collabora Online’s integration with re-compiled and/or re-branded backends. This app may work with other WOPI Edtiors such as LibreOffice Online but it is not tested.

### Federated editing / Global Scale

Collaborative editing of federated documents requires richdocuments version 3.4 on all involved servers. Besides that the following conditions must be met:

- Make sure the remote server is added as a trusted server
- Allow any domain to embed Collabora Online in a frame:
  `<frame_ancestors>https://*</frame_ancestors>` must be set in coolwsd.xml

**Note:** Due to our content security policy we cannot open a document on a remote instance without reloading the page to allow Nextcloud embedding the remote Collabora Online instance in a frame.

### AI document generation

This app is able to generate office documents from a prompt using AI. See the [AI doc](./docs/ai.md).

## Development setup

Just clone this repo into your apps directory ([Nextcloud server](https://github.com/nextcloud/server#running-master-checkouts) installation needed). Additionally, [npm](https://www.npmjs.com/), [Node.js](https://nodejs.org/en/download/package-manager/), and [Composer](https://getcomposer.org/) are needed for installing JavaScript dependencies and building the frontend code.

Once npm, Node.js, and Composer are installed, this can be done by running:
```bash
composer install
npm ci
npm run dev
```


## Support

- [Our Forum](https://help.nextcloud.com/c/support/office)
- [Collabora Online Forum](https://forum.collaboraonline.com/)

Enterprise users who need a more reliable and scalable solution can take advantage of Nextcloud GmbH's optional support contract for Collabora Online. Find out more about Enterprise support for Collabora Online over here: https://nextcloud.com/enterprise/

- [Request a quote](https://nextcloud.com/enterprise/buy/)
