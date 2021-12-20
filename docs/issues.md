
## Troubleshooting

Some common issues:

### Can't configure the URL in the Admin panel.

This is most likely caused by the Documents app being enabled. Disable it and you can set the URL.

### I get connection errors when trying to open documents


Be sure to check the error log from docker (docker logs id-of-your-instance). If the logs note something like:
No acceptable WOPI hosts found matching the target host [YOUR NEXTCLOUD DOMAIN] in config.
Unauthorized WOPI host. Please try again later and report to your administrator if the issue persists.
you might have started the docker container with the wrong URL. Be sure to triplecheck that you start it with the URL of your Nextcloud server, not the server where Collabora Online runs on.

### Connection is not allowed errors.

It is possible your firewall is blocking connections. Try to start docker after you started the firewall, it makes changes to your iptables to enable Collabora Online to function.

### We are sorry, this is an unexpected connection error. Please try again. error.

The Nextcloud Office app doesn't work at the moment, if you enable it only for certain groups. Remove the group filter in the App section.

### Nextcloud Office doesn't handle my 100 users.

This docker image is designed for home usage with a limited numbers of users and open documents. If you need a more scalable solution, consider a support subscription for a reliable, business-ready online office experience.

#### Nextcloud Office doesn't work with Encryption.

Yes, this is currently unsupported. Find more questions and answers in the discussion thread on the forums and post a new topic in the Collabora category if you have unanswered questions!
