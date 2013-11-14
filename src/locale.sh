#!/bin/bash
#extracts strings for translation
JS_PATH=../js/
WEBODF_PATH=../js/3rdparty/webodf/

grep -ohEr "tr\([\"|'][^\"|']*[\"|']\)" ${WEBODF_PATH} | sed -e "s/^tr(/t('documents',\ /" -e "s/\$/;/" > ${JS_PATH}locale.js

grep -ohEr "text-i18n=[\"|'][^\"|']*[\"|']" ${WEBODF_PATH} | sed -e "s/^text-i18n=/t('documents',\ /" -e "s/\$/);/" >> ${JS_PATH}locale.js

