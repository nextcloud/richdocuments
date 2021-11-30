

# Getting started in 3 steps
We'll describe how to get Collabora Online running on your server and how to integrate it into your Nextcloud using the docker image Nextcloud and Collabora built.

# Requirements
To install it the following dependencies are required:

- A host that can run a Docker container
- A subdomain or a second domain that the Collabora Online server can run on
- An Apache server with some enabled modules (NGINX instructions in a blog here)
- A valid SSL certificate for the domain that Collabora Online should run on
- A valid SSL certificate for your Nextcloud

Note: This guide does NOT cover self-signed certificates. If you use a self-signed certificate then you're mostly on your own ;-)

## Install the Collabora Online server

### Setup using the built-in CODE server

Install the [Collabora Online - Built-in CODE Server](https://apps.nextcloud.com/apps/richdocumentscode) app from your Nextclouds apps management. This app provides a built-in server with all of the document editing features of Collabora Online. Easy to install, for personal use or for small teams. It is a bit slower than a standalone server and without the advanced scalability features.

### Setup using docker

The [collabora/code](https://hub.docker.com/r/collabora/code/) Docker image can be installed to any x86-64 host (e.g. on Linux and Windows 10), and it is fully configurable. For more information about setup and configuration for deployment, please read the [CODE Docker page](https://www.collaboraoffice.com/code/docker/). If you want to try it out quickly, you can set up CODE docker image with file sharing integration in less than 5 minutes in a very basic way, following these instructions: [quick tryout with Nextcloud](https://www.collaboraoffice.com/code/quick-tryout-nextcloud-docker/).

The following steps will download the Collabora Online docker, make sure to replace "cloud.nextcloud.com" with the host that your own Nextcloud runs on. Also make sure to escape all dots with double backslashes (\), since this string will be evaluated as a regular expression (and your bash 'eats' the first backslash.) If you want to use the docker container with more than one Nextcloud, you'll need to use 'domain=cloud\\.nextcloud\\.com\|second\\.nexcloud\\.com' instead. (All hosts are separated by \|.)

    docker pull collabora/code
    docker run -t -d -p 127.0.0.1:9980:9980 \
        -e 'domain=cloud\\.nextcloud\\.com' \
        --restart always \
        --cap-add MKNOD \
        collabora/code
			
Optionally, you can select the dictionaries you want with:

            docker run -t -d -p 127.0.0.1:9980:9980 -e 'domain=cloud\\.nextcloud\\.com' -e 'dictionaries=de en es ..' --restart always --cap-add MKNOD collabora/code
            
This way you are not only limited to German, English, Italian, French and Spanish.

That will be enough. Once you have done that the server will listen on "localhost:9980". Now we just need to configure the locally installed Apache reverse proxy.

### Setup using packages

As an alternative to Docker image, Collabora provide native Linux packages for selected Linux distributions. If you have Debian 8, Debian 9, Ubuntu 16.04, Ubuntu 18.04, CentOS 7 or openSUSE Leap, please read the [CODE Linux packages](https://www.collaboraoffice.com/code/linux-packages/) page.


## Setting up a reverse proxy and SSL

It is highly recommended to set up a reverse proxy in front of CODE, either you run CODE from Docker, or you use native packages. It is easy, and this way CODE can be reached on standard HTTP or HTTPS ports. We provide sample configuration files for Apache2 and Nginx. If you want SSL, we recommend certificates from [Let's Encrypt](https://certbot.eff.org/).

-   [Setting up Apache 2 reverse proxy](https://www.collaboraoffice.com/code/apache-reverse-proxy/)
-   [Setting up Nginx reverse proxy](https://www.collaboraoffice.com/code/nginx-reverse-proxy/)

Now you can give `https://collabora.example.com` as the WOPI URL in your preferred File Sync and Share solution. See below for specific examples.


### Apache guide

On a recent Ubuntu or Debian this should be possible using:

    apt-get install apache2
    a2enmod proxy
    a2enmod proxy_wstunnel
    a2enmod proxy_http
    a2enmod ssl

Afterward, configure one VirtualHost properly to proxy the traffic. For security reason we recommend to use a subdomain such as office.nextcloud.com instead of running on the same domain. An example config can be found below:

				
    <VirtualHost *:443>
    ServerName office.nextcloud.com:443

    # SSL configuration, you may want to take the easy route instead and use Lets Encrypt!
    SSLEngine on
    SSLCertificateFile /path/to/signed_certificate
    SSLCertificateChainFile /path/to/intermediate_certificate
    SSLCertificateKeyFile /path/to/private/key
    SSLProtocol             all -SSLv2 -SSLv3
    SSLCipherSuite ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS
    SSLHonorCipherOrder     on

    # Encoded slashes need to be allowed
    AllowEncodedSlashes NoDecode

    # Container uses a unique non-signed certificate
    SSLProxyEngine On
    SSLProxyVerify None
    SSLProxyCheckPeerCN Off
    SSLProxyCheckPeerName Off

    # keep the host
    ProxyPreserveHost On

    # static html, js, images, etc. served from coolwsd
    # browser is the client part of LibreOffice Online
    ProxyPass           /browser https://127.0.0.1:9980/browser retry=0
    ProxyPassReverse    /browser https://127.0.0.1:9980/browser

    # WOPI discovery URL
    ProxyPass           /hosting/discovery https://127.0.0.1:9980/hosting/discovery retry=0
    ProxyPassReverse    /hosting/discovery https://127.0.0.1:9980/hosting/discovery

    # Main websocket
    ProxyPassMatch "/cool/(.*)/ws$" wss://127.0.0.1:9980/cool/$1/ws nocanon

    # Admin Console websocket
    ProxyPass   /cool/adminws wss://127.0.0.1:9980/cool/adminws

    # Download as, Fullscreen presentation and Image upload operations
    ProxyPass           /cool https://127.0.0.1:9980/cool
    ProxyPassReverse    /cool https://127.0.0.1:9980/cool

    # Endpoint with information about availability of various features
    ProxyPass           /hosting/capabilities https://127.0.0.1:9980/hosting/capabilities retry=0
    ProxyPassReverse    /hosting/capabilities https://127.0.0.1:9980/hosting/capabilities
    </VirtualHost>
			
After configuring these do restart your apache using /etc/init.d/apache2 restart.

## Configure the app

You can configure the app either from within Nextcloud itself, or from the
commandline. The latter facilitates automated setup, e.g. via Ansible.

### Configure the app in Nextcloud

Go to the Apps section and choose "Office & text"
Install the "Collabora Online app"
Admin -> Collabora Online -> Specify the server you have setup before (e.g. "https://office.nextcloud.com")

Congratulations, your Nextcloud has Collabora Online Office integrated!

### Configure the app from the commandline

From a shell running in the Nextcloud root directory, run the following `occ`
commands, substituting the server url you've setup (e.g. "https://office.nextcloud.com"):

	./occ config:app:set --value ${SERVER_URL} richdocuments wopi_url
	./occ richdocuments:activate-config

Congratulations, your Nextcloud has Collabora Online Office integrated!

## Updating the docker image

Occasionally, new versions of this docker image are released with security and feature updates. We will of course let you know when that happens! This is how you upgrade to a new version:

grab new docker image:

    docker pull collabora/code

List docker images:

    docker ps

from the output you can glean the Container ID of your Collabora Online docker image.
stop and remove the Collabora Online docker image:

    docker stop CONTAINER_ID
    docker rm CONTAINER_ID

start the new image:

    docker run -t -d -p 127.0.0.1:9980:9980 -e 'domain=cloud\\.nextcloud\\.com' --restart always --cap-add MKNOD collabora/code

Enjoy!
