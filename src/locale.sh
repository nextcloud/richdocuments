#!/bin/bash
#extracts strings for translation

if [ ! -e "README.md" ]; then
   echo "Call me in the toplevel dir of OwnCloud Documents."
        exit 1
fi

JS_PATH=js/
WEBODF_PATH=js/3rdparty/webodf/

TMP=/tmp/documents-locale.js

grep -ohEr "tr\([\"|'][^\"|']*[\"|']\)" ${WEBODF_PATH} | sed -e "s/\"/'/g" -e "s/^tr(/t('documents',\ /" -e "s/\$/;/" > ${TMP}

grep -ohEr "text-i18n=[\"|'][^\"|']*[\"|']" ${WEBODF_PATH} | sed  -e "s/\"/'/g" -e "s/^text-i18n=/t('documents',\ /" -e "s/\$/);/" >> ${TMP}

sort ${TMP} | uniq > ${JS_PATH}locale.js