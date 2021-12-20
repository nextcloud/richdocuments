# Nextcloud Office
[![Build Status](https://scrutinizer-ci.com/g/nextcloud/richdocuments/badges/build.png?b=master)](https://scrutinizer-ci.com/g/nextcloud/richdocuments/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/nextcloud/richdocuments/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/nextcloud/richdocuments/?branch=master)
[![irc](https://img.shields.io/badge/IRC-%23nextcloud%20on%20freenode-orange.svg)](https://webchat.freenode.net/?channels=nextcloud)

**A [Nextcloud](https://nextcloud.com) app integrating Collabora Online into your Nextcloud!**

![](https://nextcloud.com/wp-content/themes/next/assets/img/features/collabora-document.png)


## Development setup

Just clone this repo into your apps directory ([Nextcloud server](https://github.com/nextcloud/server#running-master-checkouts) installation needed). Additionally, [npm](https://www.npmjs.com/) and [Node.js](https://nodejs.org/en/download/package-manager/) are needed for installing JavaScript dependencies and building the frontend code.

Once npm and Node.js are installed, this can be done by running:
```bash
npm ci
npm run dev
```

## Installation

### Server

You will need a working Collabora Online server to connect to.
Find out more about Nextcloud and Collabora Online, and how to setup an server here: https://nextcloud.com/collaboraonline/

Note: it is possible to use Collabora Online’s integration with re-compiled and/or re-branded backends. This app may work with other WOPI Edtiors such as LibreOffice Online but it is not tested.

### Nextcloud app

In your Nextcloud, simply navigate to »Apps«, choose the category »Office & text«, find the Nextcloud Office app and enable it. Then open the administrator settings, navigate to the »Nextcloud Office« tab and specify your Collabora Online server.

### Nextcloud/Collabora Online relation

For the latest information about the Collabora Online and Nextcloud releases, please visit the:

[Apps page of Collabora](https://apps.nextcloud.com/apps/richdocuments).

### Federated editing / Global Scale
Collaborative editing of federated documents requires richdocuments version 3.4 on all involved servers. Besides that the following conditions must be met:

- Make sure the remote server is added as a trusted server
- Allow any domain to embed Collabora Online in a frame:
  `<frame_ancestors>https://*</frame_ancestors>` must be set in coolwsd.xml

**Note:** Due to our content security policy we cannot open a document on a remote instance without reloading the page to allow Nextcloud embedding the remote Collabora Online instance in a frame.


### Scripted installation (Ubuntu), Server + Nextcloud app
The developers of the [Nextcloud VM](https://github.com/nextcloud/vm) has made a [script](https://raw.githubusercontent.com/nextcloud/vm/master/apps/collabora.sh) that you can use.
Please remember to check the variables in the script to suit your config before you run it, though it should work out of the box on all Ubuntu servers from 16.04 an upwards.

The only thing you must have prepared before you run the script is to have SSL (https://) on your Nextcloud domain and to setup a DNS record to a new domain that you will host Collabora Online on (office.domain.com for example) and point that your server. SSL is set up with Let's Encrypt.

To get the script, please type the following command: `wget https://github.com/nextcloud/vm/blob/master/apps/collabora.sh` and then run the script with `sudo bash nextant.sh`.

Please report any issues regarding the script in the [Nextcloud VM repo](https://github.com/nextcloud/vm/issues).

## Support

- [Our Forum](https://help.nextcloud.com/c/support/collabora)

Enterprise users who need a more reliable and scalable solution can take advantage of Nextcloud GmbH's optional support contract for Collabora Online. Find out more about Enterprise support for Collabora Online over here: https://nextcloud.com/enterprise/

- [Request a quote](https://nextcloud.com/enterprise/buy/)
