richdocuments – ownCloud application to integrate Collabora Online
====================================================================

Installation
------------

    `make dist`

Creates a tarball. The contents should go under `owncloud/apps/richdocuments`.

    `rpmbuild -ba -vv owncloud-collabora-online.spec`

Creates an RPM package (tested only with openSUSE). The [CODE VM](https://collaboraoffice.com/code/) uses it. 

Memcache is a requirement (tested only with APCu). Install php-apcu, php5-apcu, or whatever this package is called on your Linux distro, and add the following line to owncloud/config/config.php:

    `'memcache.local' => '\OC\Memcache\APCu',`

From command line you can use:

    `occ config:system:set --value='\OC\Memcache\APCu' memcache.local`

You can enable richdocument application from the command line:

    `occ app:enable richdocuments`

You need to configure the WOPI Client URL, which is where the LibreOffice Online WebSocket Daemon (loolwsd) is listening. It is in Admin - Collabora Online section in ownCloud, or you can set it from command line:

    `occ config:app:set --value='https://<hostname or IP address>:<port>' richdocuments wopi_url`

Default port is 9980. If loolwsd was compiled without SSL (like in the [CODE VM](https://collaboraoffice.com/code/)), you have to write `http` instead of `https`.
