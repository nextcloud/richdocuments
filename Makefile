VERSION=$(shell grep '<version>' appinfo/info.xml | sed -e 's/^.*<version>\(.*\)<\/version>.*$$/\1/')

.PHONY: dist
dist: owncloud-collabora-online.spec appinfo/info.xml
	rm -rf owncloud-collabora-online-$(VERSION)
	mkdir owncloud-collabora-online-$(VERSION)
	tar cf - *.php \
                appinfo \
                assets \
                controller \
                css \
                img \
                js \
                l10n \
                lib \
                templates \
                | ( cd owncloud-collabora-online-$(VERSION) && tar xf - )
	tar cfz owncloud-collabora-online-$(VERSION).tar.gz owncloud-collabora-online-$(VERSION)
	rm -rf owncloud-collabora-online-$(VERSION)

app: appinfo/info.xml
	rm -rf richdocuments
	mkdir richdocuments
	tar cf - *.php \
                appinfo \
                assets \
                controller \
                css \
                img \
                js \
                l10n \
                lib \
                templates \
                | ( cd richdocuments && tar xf - )
	zip -r richdocuments.zip richdocuments
	rm -rf richdocuments

owncloud-collabora-online.spec: owncloud-collabora-online.spec.in appinfo/info.xml
	sed -e 's/@PACKAGE_VERSION@/$(VERSION)/g' <owncloud-collabora-online.spec.in >owncloud-collabora-online.spec
