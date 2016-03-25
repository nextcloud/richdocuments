VERSION=0.9.1

.PHONY: dist
dist: owncloud-collabora-online.spec
	rm -rf owncloud-collabora-online-$(VERSION)
	mkdir owncloud-collabora-online-$(VERSION)
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
                | ( cd owncloud-collabora-online-$(VERSION) && tar xf - )
	tar cfz owncloud-collabora-online-$(VERSION).tar.gz owncloud-collabora-online-$(VERSION)
	rm -rf owncloud-collabora-online-$(VERSION)

owncloud-collabora-online.spec: owncloud-collabora-online.spec.in Makefile
	sed -e 's/@PACKAGE_VERSION@/$(VERSION)/g' <owncloud-collabora-online.spec.in >owncloud-collabora-online.spec

