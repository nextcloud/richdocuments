# Federated file editing

Collabra Online offers support for collaborative editing of files that are shared through federated
sharing. The file will always be opened on the file owners instance (Source) and other users will
connect to that through their Nextcloud instance (Initiator).

In a federated scenario both Nextcloud servers need to add each other as trusted servers or in a
global scale environment a list of nodes can be added through the `gs.trustedHosts` setting in the
config.php file.

When a Initiator opens a file that is located on an incoming federated share, a check will be
performed if the share owners instance supports federated editing. If that is the case a Initiator
token will be created, and the user will be redirected to the Source instance to open the file.

The source instance will then fetch the user and file details, create a WOPI token for the remote
user with those details and open the document with that.
