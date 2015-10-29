VERSION=1.0.0

.PHONY: dist
dist: owncloud-ccs.spec
	rm -rf owncloud-ccs-$(VERSION)
	mkdir owncloud-ccs-$(VERSION)
	cp -ra  *.php assets controller img l10n appinfo css js lib templates owncloud-ccs-$(VERSION)
	tar cfz owncloud-ccs-$(VERSION).tar.gz owncloud-ccs-$(VERSION)
	rm -rf owncloud-ccs-$(VERSION)

owncloud-ccs.spec: owncloud-ccs.spec.in Makefile
	sed -e 's/@PACKAGE_VERSION@/$(VERSION)/g' <owncloud-ccs.spec.in >owncloud-ccs.spec

