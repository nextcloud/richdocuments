# Federated file editing

Collabra Online offers support for collaborative editing of files that are shared through federated
sharing. The file will always be opened on the file owners instance (Source) and other users will
connect to that through their Nextcloud instance (Initiator).

In a federated scenario both Nextcloud servers need to add each other as trusted servers or in a
global scale environment a list of nodes can be added through the `gs.trustedHosts` setting in the
config.php file:

```php
'gs.trustedHosts' => [
	'gs1.example.com',
	'gs2.example.com',
	'collabora.example.com'
]
```

Using wildcards is also possible:

```php
'gs.trustedHosts' => [
	'*.example.com'
]
```

When a Initiator opens a file that is located on an incoming federated share, a check will be
performed if the share owners instance supports federated editing. If that is the case a Initiator
token will be created, and the user will be redirected to the Source instance to open the file.

The source instance will then fetch the user and file details, create a WOPI token for the remote
user with those details and open the document with that.

## Allow remote access on Collabora
Collabora by default only allows embedding from the same remote that the initial frame is loaded. In order to enable embedding also in trusted remotes like a different GS node, the following setting will allow that:

Assuming gs1.example.com and gs2.example.com are Nextcloud servers:

	coolconfig set net.frame_ancestors "*.example.com"

## Trusted hosts

By default, trusted hosts of Nextcloud will not be allowed for federated editing. This can be enabled through the following app config value:

	occ config:app:set richdocuments federation_use_trusted_domains --value="yes"
