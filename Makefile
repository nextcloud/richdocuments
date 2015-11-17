VERSION=1.0.3

.PHONY: dist
dist: owncloud-ccs.spec
	rm -rf owncloud-ccs-$(VERSION)
	mkdir owncloud-ccs-$(VERSION)
	tar cf -  *.php \
                appinfo \
                assets \
                controller \
                css/style.css \
                img \
                js/*.js \
                js/3rdparty/resources \
                js/viewer \
                js/widgets \
                l10n \
                lib \
                templates \
                | ( cd owncloud-ccs-$(VERSION) && tar xf - )
	tar cfz owncloud-ccs-$(VERSION).tar.gz owncloud-ccs-$(VERSION)
	rm -rf owncloud-ccs-$(VERSION)

owncloud-ccs.spec: owncloud-ccs.spec.in Makefile
	sed -e 's/@PACKAGE_VERSION@/$(VERSION)/g' <owncloud-ccs.spec.in >owncloud-ccs.spec

